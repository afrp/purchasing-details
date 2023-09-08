import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import payment from './modules/payment';

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
      createPersistedState()
  ],
  modules:{
      payment
  },
})
