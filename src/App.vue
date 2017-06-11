<template>
  <div id="appContent">
    <navigation></navigation>
    <router-view class="view one" name="first"></router-view>
    <router-view class="view two" name="second"></router-view>
    <router-view class="view three" name="third"></router-view>
    <Back-top></Back-top>
  </div>
</template>

<script>
  export default {
    components: {}
  }
</script>

<style scoped>
  @media(min-width:1200px){
    #appContent{  min-width:1000px; }
  }
  @media(min-width:992px) {
    #appContent{ min-width: 992px;}
  }
  @media(min-width: 768px){
    #appContent{ min-width: 768px;}
  }
</style>
