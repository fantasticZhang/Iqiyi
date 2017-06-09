<template>
  <div>
    <Carousel autoplay v-model="value1" v-if="recommend">
      <div class="content" v-for="item in recommend">
        <Carousel-item class="carouselItemOuter">
          <a :a_id="item.a_id" :tv_id="item.tv_id" @click="launch">
            <img class="carouselItem"  :src="item.img">
          </a>
        </Carousel-item>
      </div>
    </Carousel>
  </div>
</template>

<script>
export default{

  data(){
    return{
      value1:0,
      recommend:null
    }
  },
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      this.$api.get('recommend',{},r=>{
        this.recommend = this.formatData(r.data[0].video_list)
      })
    },
    formatData(videoList){
      return videoList.map((item,index) => {
        item.img += "?sign=iqiyi";
        return item
      })
    },
    launch: event => {
      let aid = event.target.getAttribute('a_id');
      let tvid = event.target.getAttribute('tv_id');
      location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(location.href);
    }
  }
}
</script>

<style lang="scss" scoped="">
  @media(max-width: 768px){
    .carouselItem{ width:100%}
  }
  @media(min-width: 769px){
    $topColor: #e0eee8;
    $bottomColor: #f3f9f1;
    .carouselItemOuter{
      text-align: center;
      background: -webkit-linear-gradient(180deg,$topColor,$bottomColor);
      background: -o-linear-gradient(180deg,$topColor,$bottomColor);
      background: -moz-linear-gradient(180deg,$topColor,$bottomColor);
      background: linear-gradient(180deg,$topColor,$bottomColor);
    }
  }


</style>
