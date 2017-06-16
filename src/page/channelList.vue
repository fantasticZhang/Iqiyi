<template>
  <section id="channelList" >
    <div class="loading" v-if="loading">
      <Spin>
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>

    <div v-if="channelLists">
      <Card shadow>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          频道列表
        </p>
        <ul >
          <Row>
            <Col :xs="4" :md="2" v-for="item in channelLists" :key="item.id">
              <li class="channel">
                <a @click="channelDetail(item.name)">{{ item.name }}</a>
              </li>
            </Col>
          </Row>
        </ul>
      </Card>
    </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        channelLists: null,
        loading: false
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.channelLists = null;
        this.loading = true;
        let params = {
            type: 'list'
        };
        this.$api.get('channel', params, r => {
          this.channelLists = r.data;
          this.loading = false;
        },err=>{
          window.console.log(err);
        })
      },
      channelDetail(channelType){
          this.$router.push({name: 'detail',params:{channelType: channelType,isPurchase:0,mode:11}});
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/color";

  a{
    color: $dark;
    &:hover{
      color: $green;
    }
  }
  #channelList{
    margin: 10px 0;
  }
  .channel{
    display: inline-block;
    margin: 3px;
  }
</style>
