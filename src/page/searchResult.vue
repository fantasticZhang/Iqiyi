<template>
  <section id="searchResult">
    <div class="loading" v-if="loading">
      <Spin>
        <Icon type="load-c" size=18 ></Icon>
        <div>Loading</div>
      </Spin>
    </div>

    <div v-if="searchResult">
      <Card  shadow>
      <Row type="flex" justify="start" align="top" class="code-row-bg">
        <Col :xs="12" :md="4" v-for="item in searchResult" :key="item.id">
        <section class="video">
            <div class="videoImgOuter">
              <a href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                <img class="videoImg" :src="item.img">
              </a>
            </div>
              <div>
                <a class="videoTitle" href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >{{ item.short_title}}</a>
                <div class="videoTitle">简介：{{ item.title}}</div>
              </div>
        </section>
        </Col>
      </Row>

      <div class="pager">
        <Page :total="total" :page-size="pageSize" @on-change="changePage"></Page>
      </div>

      </Card>
    </div>

    <div class="noData" v-if="noData"><Alert type="error" show-icon>还没有符合您要求的视频，换个词试试~</Alert></div>

  </section>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        searchResult: null,
        noData:false,
        total: 300,
        pageSize: 30,
        pageNum: 1
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
        this.noData = false;
        let params = {
          key: this.$route.params.keyword,
          from: 'mobile_list',
          page_size: this.pageSize,
          pg_num: 1
        };
        this.$api.get('search', params, r => {
          this.loading = false;
          this.noData = false;
          this.searchResult = this.formatImgUrl(r.data)
        },err=>{
          this.searchResult = null;
          this.loading = false;
          this.noData = true;
        })
      },
      changePage(current){
        this.pageNum = current;
        let params = {
          key: this.$route.params.keyword,
          from: 'mobile_list',
          page_size: this.pageSize,
          pg_num: current
        };
        this.$api.get('search', params, r => {
          this.loading = false;
          this.noData = false;
          this.searchResult = this.formatImgUrl(r.data)
        },err=>{
          this.searchResult = null;
          this.loading = false;
          this.noData = true;
        });

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      launch: event => {
        let aid = event.target.getAttribute('a_id');
        let tvid = event.target.getAttribute('tv_id');
        location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(location.href);
      },
      formatImgUrl(videoList){
          return videoList.map(item => {
            item.img = item.img.replace(".jpg","_220_124.jpg");
            item.img += "?sign=iqiyi";
            return item
          })
      }
    }

  }
</script>

<style lang="scss" scoped>

  @import "../style/common";
  .pager{
    width: 400px;
    margin: 20px auto;
  }

  @media(min-width:769px) {
    #searchResult{
      margin: 20px 0;
    }
  }
  @media(max-width: 768px){
    #searchResult{
      margin: 0 0 20px 0;
    }
  }
</style>
