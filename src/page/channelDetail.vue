<template>
  <div>
      <div class="loading" v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="channelDetail">
        <Row type="flex" justify="start" align="top" class="code-row-bg">
          <Col :xs="12" :md="4" v-for="item in channelDetail">
          <section class="video">
            <Card>
              <div slot="title">
                <div class="videoTitle">{{ item.title }}</div>
                <div class="videoTitle">发布时间：{{ item.date_format }}</div>
                <div class="videoTitle">评分：{{ item.sns_score }}</div>
                <div class="videoTitle">播放次数：{{ item.play_count_text }}</div>
              </div>
              <a href="#" slot="extra" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                <Icon type="play"></Icon>
              </a>
              <div class="videoImgOuter">
                <a href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                  <img class="videoImg" :src="item.img">
                </a>
              </div>
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

<style scoped>
  .video{
    padding: 5px;
  }
  .videoImg{
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
  div.videoTitle:first-child{
    font-weight: bolder;
  }
  div.videoTitle{
    padding-bottom:5px;
  }
  div.videoImgOuter{
    text-align: center;
  }
</style>
