<template>
  <section>
    <Carousel autoplay v-if="recommend">
      <div class="content" v-for="item in recommend" :key="item.id">
        <Carousel-item class="carouselItemOuter">
          <a :a_id="item.a_id" :tv_id="item.tv_id" @click="launch">
            <img class="carouselItem"  :src="item.img">
          </a>
        </Carousel-item>
      </div>
    </Carousel>
  </section>
</template>

<script>
export default{

  data(){
    return{
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
      },err=>{
          window.console.log(err);
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
  @import "../style/color";
  @media(max-width: 768px){
    .carouselItem{ width:100%}
  }
  @media(min-width: 769px){
    .carouselItemOuter{
      text-align: center;
      background: -webkit-linear-gradient(180deg,$darkBlue,$darkGray);
      background: -o-linear-gradient(180deg,$darkBlue,$darkGray);
      background: -moz-linear-gradient(180deg,$darkBlue,$darkGray);
      background: linear-gradient(180deg,$darkBlue,$darkGray);
    }
  }


</style>
