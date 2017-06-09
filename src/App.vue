<template>
  <div id="appContent">
    <navigation></navigation>
    <router-view class="view one" name="first"></router-view>
    <router-view class="view two" name="second"></router-view>
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
  @media(max-width: 768px){
    #appContent{ min-width: 768px;}
  }
</style>
