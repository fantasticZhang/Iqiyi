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
        <div class="content" v-for="item in searchResult">
          <div class="row">
            <div class="icon"><img :src="item.img"></div>
            <div class="video">
              <div>片名：{{ item.title }}</div>
              <div>评分：{{ item.sns_score }}</div>
              <div>播放次数：{{ item.play_count_text }}</div>
              <div>上映时间：{{ item.date_format }}</div>
              <div>
                <Button type="primary" class="btn btn-success" :a_id="item.a_id" :tv_id="item.tv_id"
                        v-on:click="launch">立即观看
                </Button>
              </div>
            </div>
          </div>
        </div>
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
            item.img += "?sign=iqiyi";
            return item
          })
      }
    }

  }
</script>
