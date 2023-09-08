<template>
    <div class="checkout__container">
        <div class="checkout__step-wrapper">
            <StepProgress />
        </div>        
        <div class="checkout__box-back" @click="updatePage(1)" v-show="purchaseStatus < 3">
            <ArrowBack />
            <p>{{ purchaseStatus === 1 ? 'Back to cart' : 'Back to delivery'}}</p>
        </div>
        <div class="checkout__container-content">
            <div class="checkout__content-left" v-if="purchaseStatus === 1">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <HeaderTitle title="Delivery details" />
                    <div class="checkbox-wrap" @click="updateDropship()">
                        <div class="check-box">
                            <Check v-if="asDropshipper"/>
                        </div>
                        <p>Send as dropshipper</p>
                    </div>
                </div>

                <div class="checkout__box-form">
                    <div class="checkout__form-wrap">
                        <div class="floating checkout__form-input">
                            <input 
                                id="input__email" 
                                v-model="deliveryData.email" 
                                class="floating__input" 
                                :class="{success: validateData.email === 1, fail: validateData.email === 2}"
                                name="email" 
                                @input="validateEmail"
                                type="text" 
                                placeholder="Email" 
                            />
                            <label for="input__email" class="floating__label" :class="{success: validateData.email === 1, fail: validateData.email === 2}" data-content="Email">
                            <span class="hidden--visually">Email</span></label>
                            <div class="icon-input" v-if="validateData.email === 1">
                                <Check />
                            </div>
                            <div class="icon-input" v-if="validateData.email === 2">
                                <XButton />                                
                            </div>
                        </div>
                        <div class="floating checkout__form-input small">
                            <input id="input__dropshipername" v-model="deliveryData.dropshiperName" class="floating__input" name="dropshipername" type="text" placeholder="Dropshiper name" :disabled="!asDropshipper" />
                            <label for="input__dropshipername" class="floating__label" data-content="Dropshiper name">
                            <span class="hidden--visually">Dropshiper name</span></label>
                        </div>
                    </div>
                    <div class="checkout__form-wrap">
                        <div class="floating checkout__form-input">
                            <input 
                                id="input__phonenumber" 
                                v-model="deliveryData.phoneNumber" 
                                class="floating__input" 
                                :class="{success: validateData.phoneNumber === 1, fail: validateData.phoneNumber === 2}"
                                name="phonenumber" 
                                type="text" 
                                maxlength="20"
                                placeholder="Phone number" 
                                @keypress="handleInputNumber($event, 'phoneNumber')"
                            />
                            <label 
                                for="input__phonenumber" 
                                class="floating__label" 
                                data-content="Phone number"
                                :class="{success: validateData.phoneNumber === 1, fail: validateData.phoneNumber === 2}"
                            >
                            <span class="hidden--visually">Phone number</span></label>
                            <div class="icon-input" v-if="validateData.phoneNumber === 1">
                                <Check />
                            </div>
                            <div class="icon-input" v-if="validateData.phoneNumber === 2">
                                <XButton />                                
                            </div>
                        </div>
                        <div class="floating checkout__form-input small">
                            <input 
                                id="input__dropshipperphonenumber" 
                                v-model="deliveryData.dropshiperNumber" 
                                class="floating__input" 
                                :class="{success: validateData.dropshiperNumber === 1, fail: validateData.dropshiperNumber === 2}"
                                name="dropshipperphonenumber" 
                                type="text" 
                                placeholder="Dropshipper phone number" 
                                maxlength="20"
                                :disabled="!asDropshipper"
                                @keypress="handleInputNumber($event, 'dropshiperNumber')"
                            />
                            <label 
                                for="input__dropshipperphonenumber" 
                                class="floating__label" 
                                data-content="Dropshipper phone number"
                                :class="{success: validateData.dropshiperNumber === 1, fail: validateData.dropshiperNumber === 2}"
                            >
                            <span class="hidden--visually">Dropshipper phone number</span></label>
                            <div class="icon-input" v-if="validateData.dropshiperNumber === 1">
                                <Check />
                            </div>
                            <div class="icon-input" v-if="validateData.dropshiperNumber === 2">
                                <XButton />                                
                            </div>
                        </div>
                    </div>
                    <div class="checkout__form-wrap">
                        <div class="floating checkout__form-input">                            
                            <textarea id="input__address" v-model="deliveryData.deliveryAddress" maxlength="120" class="floating__input text-area" rows="4" name="address" placeholder="Delivery Address"></textarea>
                            <label for="input__address" class="floating__label floating__label-textarea" data-content="Delivery Address">
                            <span class="hidden--visually">Delivery Address</span></label>
                            <span class="text-count">{{ deliveryData.deliveryAddress.length }}/120</span>
                        </div>                        
                    </div>

                </div>
            </div>
            <div class="checkout__content-left big-gap" v-if="purchaseStatus === 2">
                <div class="checkout__shipment-wrap">
                    <HeaderTitle title="Shipment" />
                    <div class="checkout__options-box">                   
                        <div 
                            class="checkout__option-item" 
                            :class="{active: shipment !== null && option.name === shipment.name}" 
                            v-for="(option,index) in shipmentOption" 
                            :key="index"
                            @click="chooseShipment(option)"
                        >
                            <div class="option-item-label">
                                {{option.name}}
                            </div>
                            <div class="option-item-value">
                                {{formatNumber(option.fee)}}
                            </div>
                            <Check class="option-selected" v-if="shipment !== null && option.name === shipment.name"/>
                        </div>
                    </div>
                </div>
                <div class="checkout__shipment-wrap">
                    <HeaderTitle title="Payment" />
                    <div class="checkout__options-box">                   
                        <div 
                            class="checkout__option-item" 
                            :class="{active: paymentMethod !== null && option.name === paymentMethod.name}" 
                            v-for="(option,index) in paymentOptions" 
                            :key="index"
                            @click="choosePaymentMethod(option)"
                        >
                            <div class="option-item-label" :class="{single: option.saldo === undefined}">
                                {{option.name}}
                            </div>
                            <div v-if="option.saldo" class="option-item-value">
                                {{formatNumber(option.saldo)}} left
                            </div>
                            <Check class="option-selected" v-if="paymentMethod !== null && option.name === paymentMethod.name"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="checkout__content-left" v-if="purchaseStatus === 3">
                <div class="checkout__finish-wrap">
                    <HeaderTitle title="Thank you" />
                    <div class="checkout__finish-text-wrap">
                        <p>Order ID : {{ orderId }}</p>
                        <p class="blur">Your order will be delivered today with {{ shipment.name }}</p>
                    </div>
                    <div class="checkout__box-back" @click="resetPayment()">
                        <ArrowBack />
                        <p>Go to homepage</p>
                    </div>
                </div>                
            </div>
            <div class="checkout__content-right">
                <div class="checkout__summary">
                    <div class="title-box">
                        <div class="title-text">
                            Summary
                        </div>
                        <div class="label-text blur">
                            10 items purchased
                        </div>                        
                    </div>
                    <div v-if="shipment !== null" class="separator"></div>
                    <div v-if="shipment !== null" class="delivery-box">
                        <div class="label-text">
                            Delivery estimation
                        </div>                 
                        <div class="selected-text">
                            {{ shipment.duration }} by {{shipment.name}}
                        </div>
                    </div>
                    <div v-if="paymentMethod !== null" class="separator"></div>
                    <div v-if="paymentMethod !== null" class="delivery-box">
                        <div class="label-text">
                            Payment method
                        </div>                 
                        <div class="selected-text">
                            {{ paymentMethod.name }}
                        </div>
                    </div>
                </div>
                <div class="checkout__summary bottom-side">
                    <div class="item-price">
                        <div class="label-text blur">
                            Cost of goods
                        </div>   
                        <div class="label-text">
                            <b> {{ formatNumber(totalGoods) }} </b>
                        </div>   
                    </div>
                    <div class="item-price" v-if="asDropshipper">
                        <div class="label-text blur">
                            Dropshipping Fee
                        </div>   
                        <div class="label-text">
                            <b> {{formatNumber(dropshippingFee)}} </b>
                        </div>   
                    </div>
                    <div v-if="shipment !== null" class="item-price">
                        <div class="label-text blur">
                            <b>{{shipment.name}}</b> shipment
                        </div>   
                        <div class="label-text">
                            <b> {{formatNumber(shipment.fee)}} </b>
                        </div>   
                    </div>
                    <div class="item-price total">
                        <div class="title-text">Total</div>
                        <div class="title-text">{{formatNumber(totalPayment)}}</div>
                    </div>
                    <button class="btn-primary" @click="nextStep()" v-show="purchaseStatus < 3">
                        {{purchaseStatus == 1 ? 'Continue to Payment' : (purchaseStatus == 2 && paymentMethod !== null ? `Pay with ${paymentMethod.name}` : 'Pay with') }}
                    </button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import ArrowBack from './Icon/ArrowBack.vue'
import HeaderTitle from './UI/HeaderTitle.vue';
import StepProgress from './UI/StepProgress.vue';
import Check from './Icon/Check.vue'
import XButton from './Icon/XButton.vue'
import { mapState } from "vuex";

export default {
    components:{
        ArrowBack,
        HeaderTitle,
        StepProgress,
        Check,
        XButton
    },   
    data() {
        return {
            deliveryData: {
                email: '',
                phoneNumber: '',
                dropshiperName: '',
                dropshiperNumber: '',
                deliveryAddress: ''
            },
            validateData:{ // 0 = not validate, 1 = success, 2 = fail
                email: 0, 
                phoneNumber: 0,
                dropshiperNumber: 0,
            },
            shipmentOption: [{
                name: 'GO-SEND',
                fee: 15000,
                duration: 'today'
                },{
                name: 'JNE',
                fee: 9000,
                duration: '2 days'
            },{
                name: 'Personal Courier',
                fee: 29000,
                duration: '1 day'
            }],
            paymentOptions:[{
                name: 'e-Wallet',
                saldo: '1500000'
            },{
                name: 'Bank Transfer',
            },{
                name: 'Virtual Account'
            }],
            dropshippingFee: 15000,
            totalGoods: 500000
        };
    },
    computed:{
        ...mapState({
            purchaseStatus: state => state.payment.purchaseStatus,
            asDropshipper: state => state.payment.asDropshipper,
            shipment: state => state.payment.shipment,
            paymentMethod: state => state.payment.paymentMethod,
            deliveryDataAll: state => state.payment.deliveryData,
            validateDataAll: state => state.payment.validateData,
            orderId: state => state.payment.orderId,
        }),
        totalPayment(){
            let total = this.totalGoods;
            if (this.asDropshipper) total = total + this.dropshippingFee;
            if (this.shipment !== null) total = total + this.shipment.fee;
            return total
        }
    },
    watch:{       
        deliveryData: {            
            handler: function(newVal) {
                this.$store.commit('setDeliveryData', newVal);
            },
            deep: true
        },
        validateData: {            
            handler: function(newVal) {
                this.$store.commit('setValidateData', newVal);
            },
            deep: true
        },        
    },
    methods:{
        generateRandomString() {
            const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
            const length = 5;
            let result = '';
            const charactersLength = characters.length;

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charactersLength);
                result += characters.charAt(randomIndex);
            }

            this.$store.commit('setOrderId', result);
        },
        updatePage(num){
            this.$store.commit('setPurchaseStatus', num);
        },
        nextStep(){           
            if (this.purchaseStatus === 1){
                if (this.validateData.email !== 1 || 
                this.validateData.phoneNumber !== 1 || 
                (this.validateData.dropshiperNumber !== 1 && this.asDropshipper) ||
                (this.deliveryData.dropshiperName.length === 0 && this.asDropshipper) ||
                this.deliveryData.deliveryAddress.length === 0
                ) return;
            }            
            if (this.purchaseStatus === 2){
                if (this.shipment === null || this.paymentMethod === null) return;
                this.generateRandomString()
            }
            this.updatePage(this.purchaseStatus < 3 ? this.purchaseStatus + 1 : 1);
        },
        updateDropship(){
            this.$store.commit('setAsDropshipper', !this.asDropshipper)
        },
        chooseShipment(option){
            this.$store.commit('setShipment', option);
        },
        choosePaymentMethod(option){
            this.$store.commit('setPaymentMethod', option);
        },
        handleInputNumber(event, inputName) {   
            const input = this.deliveryData[inputName];

            // Check if the input length is less than 6 characters
            if (input.length === 0) {
                this.validateData[inputName] = 0;
            } else if (input.length < 6) {
                this.validateData[inputName] = 2;
            } else {
                this.validateData[inputName] = 1;
            }

            const char = String.fromCharCode(event.charCode);

            const regex = /^[0-9+\-()]*$/;
            
            if (!regex.test(char)) {
                event.preventDefault(); 
            }
        },
        validateEmail() {
            if (this.deliveryData.email.length === 0){
                this.validateData.email = 0;
            } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(this.deliveryData.email)) {
                this.validateData.email = 1;
            } else {
                this.validateData.email = 2;
            }
        },
        formatNumber(num) {
            return Number(num).toLocaleString();
        }, 
        resetPayment(){    
            this.updatePage(1);            
            this.deliveryData= {
                email: '',
                phoneNumber: '',
                dropshiperName: '',
                dropshiperNumber: '',
                deliveryAddress: ''
            };
            this.validateData = {
                email: 0, 
                phoneNumber: 0,
                dropshiperNumber: 0,
            };
            this.$store.commit('setAsDropshipper', false);
            this.$store.commit('setShipment', null);
            this.$store.commit('setPaymentMethod', null);
            this.$store.commit('setOrderId', null);            
        }       
    },
    mounted(){        
        if (this.deliveryDataAll !== null || this.deliveryDataAll !== undefined) this.deliveryData = this.deliveryDataAll;
        if (this.validateDataAll !== null || this.validateDataAll !== undefined) this.validateData = this.validateDataAll;        
    }
}
</script>

<style lang="stylus">
.checkout__container{
    width: 1060px;
    height: 490px;
    border-radius: 4px;
    background: #FFF;
    box-shadow: 2px 10px 20px 0px rgba(255, 138, 0, 0.10);
    position: relative;
    margin: 55px auto 0;
    padding: 30px 0 30px 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.checkout__step-wrapper{
    position: absolute;
    left: 50%;
    top: -35px;
    transform: translateX(-50%);
}
.checkout__box-back{
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0.6;
    color: #000;    
    p{
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 0;
    }
    svg{
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
}

.checkout__container-content{
    display: flex;
    gap: 30px;
    width: 100%;
    .checkout__content-left{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        &.big-gap{
            gap: 60px;
        }
    }
    .checkout__content-right{
        display: flex;
        flex-direction: column;        
        width: 300px;
        border-left: 1px solid #ffebca;
        min-height: 460px;
        margin-left: auto
    }
    .checkout__shipment-wrap, .checkout__finish-wrap{
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .checkout__finish-wrap{
        width: fit-content;
        margin: auto;
    }

    .checkout__finish-text-wrap{
        display: flex;
        flex-direction: column;
        gap: 9px;
        margin-bottom: 30px;
        p{
            color: #000;
            font-family: Inter;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin: 0;
        }
        .blur{
            opacity: 0.6;
        }
    }

    .checkout__options-box{
        display: flex;
        gap: 10px;
        align-items: center;
    }
}

.checkout__option-item{
    width: 150px;
    padding: 12px 15px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    position: relative;    
    border: 1px solid #CCC;
    background: #FFF;
    transition: all 0.2s ease;
    font-family: Inter;
    font-style: normal;
    line-height: normal;
    cursor: pointer;
    min-height: 34px;
    justify-content: center;
    &.active{
        border: 1px solid #1BD97B;
        background: rgba(27, 217, 123, 0.10);
        .option-item-value, .option-item-label{
            opacity: 1;
        }
    }
    .option-item-label{
        color: #000;
        font-size: 13px;
        font-weight: 500;
        opacity: 0.6;
        &.single{
            font-size: 16px;
        }
    }
    .option-item-value{
        color: #2D2A40;
        font-size: 16px;
        font-weight: 700;
        opacity: 0.6;
    }
    .option-selected{
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);

    }
    svg{
        width: 18px;
        height: 18px
    }
}

.checkout__summary{
    display: flex;
    flex-direction: column;
    margin: 10px 20px 0;
    gap: 15px; //21px
    &.bottom-side{
        margin: auto 20px 0;
        gap: 12px;
    }
    .title-box{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .delivery-box{
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .title-text{
        color: #FF8A00;
        font-family: Montserrat;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    .label-text{
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        &.blur{
            opacity: 0.6;
        }
        
    }
    .selected-text{
        color: #1BD97B;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .separator{
        width: 80px;
        height: 1px;
        background: #D8D8D8;
    }
    .item-price{
        width: 100%
        display: flex;
        justify-content: space-between;
        &.total{
            margin: 12px 0 18px;
        }
    }
}

.checkout__box-form{
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 36px;
    .checkout__form-wrap{
        display: flex;
        justify-content: space-between;
        .checkout__form-input{
            width: 400px;
            position: relative;
            &.small{
                width: 300px;
            }
        }
        .text-count{
            color: #000;
            font-family: Inter;
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            position: absolute;
            bottom: 8px;
            right: 5px;
            opacity: 0.5;
        }
    }

}

.icon-input{
    position:absolute;
    right: 21px;
    top: 50%;
    transform: translateY(-50%);
    height: 18px;
    svg{
        width: 18px;
        height: 18px;
    }
}

@media only screen and (max-width: 1100px) {
    .checkout__container{
        width: 100%;        
        height: max-content;
    }
    .checkout__box-form{        
        .checkout__form-wrap{
            justify-content: unset;
            gap: 10px;
            flex-direction: column;
            .checkout__form-input{
                width: 100%;
                position: relative;
                &.small{
                    width: 100%;
                }
            }
        }
    }
    .checkout__option-item{
        width: calc(100% - 30px);
    }
    .checkout__container-content{        
        gap: 15px;
        .checkout__content-right{
            min-width: 300px;
        }
        .checkout__options-box{
            flex-direction: column;
        }
        .checkout__content-left{            
            &.big-gap{
                gap: 40px;
            }
        }
        .checkout__shipment-wrap, .checkout__finish-wrap{            
            gap: 20px;
        }
    }
}

@media only screen and (max-width: 767px) {
    .checkout__container-content {
        flex-direction: column;
        .checkout__content-right{
            width: 100%;
        }
        .checkout__content-right{
            border-left: unset;
            border-top: 1px solid #ffebca;
            gap: 20px;
            min-height: unset;
        }
        .checkout__finish-wrap{                        
            margin-bottom: 30px;
        }
    }
    .checkout__container {
        padding: 40px 10px 30px;
    }
    .checkout__summary{
        margin: 10px 0 0;
        &.bottom-side{
            margin: auto 0 0;
            gap: 12px;
        }
        .title-text{
            font-size: 26px;
        }
        .title-box{
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
