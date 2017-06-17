<template>
  <section id="channelDetail">
    <div class="loading" v-if="loading">
      <Spin>
        <Icon type="load-c" size=18 ></Icon>
        <div>Loading</div>
      </Spin>
    </div>
    <div v-if="channelDetail">
      <Card  shadow>
        <Row type="flex" justify="start" align="top" class="code-row-bg">
          <Col :xs="8" :md="4" v-for="item in channelDetail" :key="item.id">
          <section class="video">
            <div class="videoImgOuter">
              <a href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                <img class="videoImg" :src="item.img">
              </a>
            </div>
            <div >
              <a class="videoTitle" href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                {{ item.short_title}}
              </a>
              <div class="videoTitle" v-if="currentChannel==='电影'">评分：{{ item.sns_score }}</div>
            </div>
          </section>
          </Col>
        </Row>

        <div class="pager">
          <Page :total="total" :page-size="pageSize" @on-change="changePage"></Page>
        </div>

      </Card>
    </div>
    <div class="noData" v-if="noData"><Alert type="error" show-icon>该频道暂无内容，去其他频道看看吧~</Alert></div>
  </section>
</template>

<script>

  export default{
      data(){
        return {
          channelDetail: null,
          total: 0,
          pageSize: 30,
          pageNum: 1,
          maxPage:50,
          loading: true,
          noData:false,
          currentChannel:null,
          isPurchase:null,
          mode:null,
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
        this.total = 0;
        if(this.$route.params.channelType){
          this.currentChannel = this.$route.params.channelType;
        }else{
            this.currentChannel="电影";  //默认值
        }

        if(this.$route.params.isPurchase){
          this.isPurchase = this.$route.params.isPurchase;
        }else{
            this.isPurchase=0;
        }

        if(this.$route.params.mode) {
            this.mode = this.$route.params.mode;
        }else{
            this.mode=11;
        }

        let params = {
          type: "detail",
          channel_name: this.currentChannel,
          mode: this.mode,
          is_purchase: this.isPurchase,
          page_size: this.pageSize,
          page_num: 1
        };
        this.$api.get('channel',params,r => {
          this.channelDetail = this.formatImgUrl(r.data.video_list);
          this.total = r.data.total || 0;
          this.total = this.total <= (this.pageSize * this.maxPage)? this.total:(this.pageSize * this.maxPage);
          this.total = parseInt(this.total);
          this.loading = false;
          this.noData = false;
        },err=>{
          this.channelDetail = null;
          this.loading = false;
          this.noData = true;
        })
      },

      changePage(current){
        this.pageNum = current;
        let params = {
          type: "detail",
          channel_name: this.currentChannel,
          mode: this.mode,
          is_purchase: this.isPurchase,
          page_size: this.pageSize,
          page_num: current
        };
        this.$api.get('channel',params,r => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          this.channelDetail = this.formatImgUrl(r.data.video_list);
          this.total = r.data.total || this.total;
          this.total = this.total <= (this.pageSize * this.maxPage)? this.total:(this.pageSize * this.maxPage);
          this.total = parseInt(this.total);
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common";

  #channelDetail{
    margin: 10px 0;
  }
  .pager{
    width: 400px;
    margin: 20px auto;
  }
</style>
