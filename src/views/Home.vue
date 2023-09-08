<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Checkout />
  </div>
</template>

<script>

import Checkout from '../components/Checkout.vue'

export default {
  name: 'Home',
  components: {
    Checkout
  }
}
</script>

<style lang="stylus">
.home{
  width: 100%;  
  display: flex;
}
</style>
