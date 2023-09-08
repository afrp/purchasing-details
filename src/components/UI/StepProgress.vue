<template>
    <div class="step-progress__box">        
          <div class="step-progress__wrap-content" v-for="(step, index) in stepData" :key="index">
            <div class="content-number" :class="{active: purchaseStatus >= index+1}">
                {{ index+1 }}
            </div>
            <div class="content-title" :class="{active: purchaseStatus === index+1}">
                {{step}}
            </div>
            <ArrowRight/>
          </div>
    </div>
</template>

<script>
import ArrowRight from '../Icon/ArrowRight.vue'
import { mapState } from "vuex";

export default {    
    components:{
        ArrowRight
    },
    data() {
        return {
            stepData: ['Delivery', 'Payment', 'Finish']
        };
    },
    computed:{
        ...mapState({
            purchaseStatus: state => state.payment.purchaseStatus
        }),
    },
}
</script>

<style lang="stylus">
.step-progress__box{
    border-radius: 35px;
    background: #FFFAE6;
    width: 500px;
    height: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 21px;
}
.step-progress__wrap-content{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #FF8A00;
    &:last-child{
        svg{
            display: none;
        }
    }
    .content-number{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #FF8A00;
        background: #ffe9b5;        
        &.active{
            background: #FF8A00;
            box-shadow: 0px 2px 4px 0px rgba(255, 138, 0, 0.30);
            color: #FFF;
        }
    }
    svg{ 
        width: 24px;
        height: 24px;
        margin-left: 12px;
    }
}

@media only screen and (max-width: 767px) {
    .content-title{
        display: none;
        &.active{
            display: block;
        }
    }
}
</style>