<template>
  <section id="channelDetail">
      <div class="loading" v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="channelDetail">
        <Row type="flex" justify="start" align="top" class="code-row-bg">
          <Col :xs="12" :md="4" v-for="item in channelDetail" :key="item.id">
          <section class="video">
            <Card shadow>
              <div slot="title">
                <a class="videoTitle" href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                  {{ item.title}}
                </a>
                <div class="videoTitle">发布时间：{{ item.date_format }}</div>
                <div class="videoTitle">评分：{{ item.sns_score }}</div>
                <div class="videoTitle">播放次数：{{ item.play_count_text }}</div>
              </div>
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
      <div class="noData" v-if="noData"><Alert type="error" show-icon>该频道暂无内容，去其他频道看看吧~</Alert></div>
  </section>
</template>

<script>

  export default{
      data(){
        return {
          channelDetail: null,
          loading: true,
          noData:false
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
        this.noData = false;
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
          this.noData = false;
        },err=>{
          this.channelDetail = null;
          this.loading = false;
          this.noData = true;
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

<style lang="scss" scoped>
  @import "../style/common";

  #channelDetail{
    margin: 10px;
  }
</style>
