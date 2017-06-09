<template>
  <div>
      <div class="loading" v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="channelDetail">
        <Row>
          <Col :xs="6" :md="4" v-for="item in channelDetail">
          <section class="video">
            <Card>
              <div slot="title">
                <div>片名：{{ item.title }}</div>
                <div>评分：{{ item.sns_score }}</div>
                <div>播放次数：{{ item.play_count_text }}</div>
                <div>上映时间：{{ item.date_format }}</div>
              </div>
              <a href="#" slot="extra" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                <Icon type="ios-play"></Icon>
              </a>
              <img :src="item.img" style="text-align:center">
            </Card>
          </section>

          </Col>
        </Row>
      </div>
  </div>
</template>

<script>

  export default{
      data(){
        return {
          channelDetail: null,
          loading: true
        }
      },
    created(){
      this.fetchData();
    },
    watch:{
      '$route': 'fetchData'
    },
    methods:{
      fetchData(){
        this.loading = true;
        this.channelDetail = null;
        let params = {
          type: "detail",
          channel_name: this.$route.params.channelType,
          mode: 11,
          is_purchase: 0
        };
        this.$api.get('channel',params,r => {
          this.channelDetail = this.formatImgUrl(r.data.video_list);
          this.loading = false;
        })
      },
      formatImgUrl(videoList){
        return videoList.map(item => {
          item.img = item.img.replace(".jpg","_195_260.jpg");
          item.img += "?sign=iqiyi";
          return item
        })
      },
      launch: event => {
        let aid = event.target.getAttribute('a_id');
        let tvid = event.target.getAttribute('tv_id');
        location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(location.href);
      },
    }
  }
</script>

<style>
  .video{
    padding: 5px;
  }
</style>
