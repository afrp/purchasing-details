
const payment = {
    namespaced: false,
    state: {
       purchaseStatus: 1,  // 1 = Delivery, 2 = Payment, 3 = Finish
       asDropshipper: false,
       shipment: null,
       paymentMethod: null,
       deliveryData: null,
       validateData: null,
       orderId: null,
    },    
    mutations: {
        setPurchaseStatus (state, obj){
            state.purchaseStatus = obj;
        },
        setAsDropshipper (state, obj){
            state.asDropshipper = obj;
        },
        setShipment (state, obj){
            state.shipment = obj;
        },
        setPaymentMethod (state, obj){
            state.paymentMethod = obj;
        },
        setDeliveryData (state, obj){
            state.deliveryData = obj;
        },
        setValidateData (state, obj){
            state.validateData = obj;
        },
        setOrderId (state, obj){
            state.orderId = obj;
        }
    },
    actions: {
        
    }
}

export default payment