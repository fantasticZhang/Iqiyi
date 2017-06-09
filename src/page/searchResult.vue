<template>
  <div>
    <div class="post">
      <div class="loading" v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>

      <div v-if="searchResult">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">
          <Col :xs="12" :md="4" v-for="item in searchResult">
          <section class="video">
            <Card>
              <div slot="title">
                <div class="videoTitle">{{ item.short_title}}</div>
                <div class="videoTitle"><strong>发布时间：</strong>{{ item.date_format }}</div>
                <div class="videoTitle"><strong>简介：</strong>{{ item.title }}</div>
                <div class="videoTitle">
                  <strong> 播放：</strong>
                  <a  href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                    <Icon type="play"></Icon>
                  </a>
                </div>
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
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        searchResult: null,
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.searchResult = null;
        this.loading = true;
        let params = {
          key: this.$route.params.keyword,
          from: 'mobile_list'
        };
        this.$api.get('search', params, r => {
          this.loading = false;
          this.searchResult = this.formatImgUrl(r.data)
        })
      },
      launch: event => {
        let aid = event.target.getAttribute('a_id');
        let tvid = event.target.getAttribute('tv_id');
        location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(location.href);
      },
      formatImgUrl(videoList){
          return videoList.map(item => {
            item.img = item.img.replace(".jpg","_195_260.jpg");
            item.img += "?sign=iqiyi";
            return item
          })
      }
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
    padding-bottom:6px;
  }
  div.videoImgOuter{
    text-align: center;
  }
</style>
