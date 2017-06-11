<template>
  <section id="billboard">
    <Row>
      <Col span="24" >
      <div class="loading" v-if="loading">
        <Spin fix>
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
      <div v-if="billboard">
        <Card v-for="channel in billboard" class="channel" shadow>
            <a class="channelTitle" @click="channelDetail(channel.title)" slot="title">
               <Icon type="play" /> &nbsp;&nbsp;{{channel.title}}
            </a>
            <a class="channelSubTitle" @click="channelDetail(channel.title)" slot="extra">
              更多&nbsp;&nbsp;&nbsp;<Icon type="ios-arrow-right"  />
            </a>
          <div >
            <Row type="flex" justify="start" align="top" class="code-row-bg" >
              <Col :xs="12" :md="4" v-for="item in channel.video_list" :key="item.id">
              <section class="video">
                <Card :bordered="false" dis-hover>
                  <a href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >
                    <img class="videoImg" :src="item.img">
                  </a>
                  <div>
                    <a class="videoTitle" href="#" :a_id="item.a_id" :tv_id="item.tv_id" @click.prevent="launch" >{{ item.short_title}}</a>
                    <div class="videoTitle">{{ item.title}}</div>
                    <div class="videoTitle">{{ item.play_count_text }}次播放</div>
                  </div>
                </Card>
              </section>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
      </Col>
    </Row>
  </section>
</template>

<script>
  export default{
    data(){
      return{
        billboard:null,
        loading:false
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
        this.billboard = null;
        this.loading = true;
        this.$api.get('recommend', {}, r => {
          this.loading = false;
          this.billboard = this.formatData(r.data);

        })
      },
      formatData(videoList){
        videoList.splice(0,1);
        videoList.forEach((item, index) => {
          item.video_list.forEach((video) => {
            video.img = video.img.replace(".jpg", "_220_124.jpg") + "?sign=iqiyi";
          });
        });
        videoList.reverse();
        return videoList;
      },
      launch: event => {
        let aid = event.target.getAttribute('a_id');
        let tvid = event.target.getAttribute('tv_id');
        location.href = 'iqiyi://mobile/player?aid=' + aid + '&tvid=' + tvid + '&ftype=27&to=3&url=' + encodeURIComponent(location.href);
      },
      channelDetail(channelType){
        this.$router.push({name: 'detail',params:{channelType: channelType}});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/common";
  #billboard{
    margin: 10px 0;
  }
  .channel{
    padding-top: 5px;
  }
  @mixin link-colors{
      color: $green;
      &:hover{
        color: $green;
      }
  }
  a.channelTitle{
    @include link-colors;
    font-size: 18px;
  }
  a.channelSubTitle{
    @include link-colors;
  }
</style>
