<template>
  <section id="filter">
    <Row>
      <Col span="24">
        <Card shadow>
          <div class="filter">
            <Row type="flex" justify="start" align="top" class="code-row-bg">
              <Col :xs="2"  :md="1">
              <span class="filterTitle">频道：</span>
              </Col>
              <Col span="22">
              <ul >
                <Row type="flex" justify="start" align="top" class="code-row-bg">
                  <Col :xs="4" :md="2" v-for="item in channelLists" :key="item.id">
                  <li :class="{filterCondition: true , selected: item.name === currentChannel}">
                    <a @click="filter(item.name,mode,isPurchase)">{{ item.name }}</a>
                  </li>
                  </Col>
                </Row>
              </ul>
              </Col>
            </Row>
          </div>

          <div class="filter">
            <Row type="flex" justify="start" align="top" class="code-row-bg">
              <Col :xs="2"  :md="1">
              <span class="filterTitle">资费：</span>
              </Col>
              <Col span="22">
              <ul >
                <Row type="flex" justify="start" align="top" class="code-row-bg">
                  <Col :xs="4" :md="2" >
                  <li :class="{filterCondition: true , selected: isPurchase === 0}">
                    <a @click="filter(currentChannel,mode,0)">免费</a>
                  </li>
                  </Col>
                  <Col :xs="4" :md="2" >
                  <li :class="{filterCondition: true , selected: isPurchase === 2}">
                    <a @click="filter(currentChannel,mode,2)">付费</a>
                  </li>
                  </Col>
                </Row>
              </ul>
              </Col>
            </Row>
          </div>

          <div class="filter">
            <Row type="flex" justify="start" align="top" class="code-row-bg">
              <Col :xs="2"  :md="1">
              <span class="filterTitle">排序：</span>
              </Col>
              <Col span="22">
              <ul >
                <Row type="flex" justify="start" align="top" class="code-row-bg">
                  <Col :xs="4" :md="2" >
                  <li :class="{filterCondition: true , selected: mode === 11}">
                    <a @click="filter(currentChannel,11,isPurchase)">热门</a>
                  </li>
                  </Col>
                  <Col :xs="4" :md="2" >
                  <li :class="{filterCondition: true , selected: mode === 4}">
                    <a @click="filter(currentChannel,4,isPurchase)">更新时间</a>
                  </li>
                  </Col>
                  <Col :xs="4" :md="2" >
                  <li :class="{filterCondition: true , selected: mode === 8}" v-if="showScore">
                    <a @click="filter(currentChannel,8,isPurchase)">评分</a>
                  </li>
                  </Col>
                </Row>
              </ul>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        channelLists: null,
        currentChannel:null,
        isPurchase:null,
        mode:null,
        showScore: false,
      }
    },
    created () {
      this.fetchData()
    },
    watch:{
     '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.channelLists = null;

        this.currentChannel = this.$route.params.channelType;
        if(!this.currentChannel) this.currentChannel="电影";  //默认值

        this.isPurchase = this.$route.params.isPurchase;
        if(!this.isPurchase) this.isPurchase=0;  //默认值

        this.mode = this.$route.params.mode;
        if(!this.mode) this.mode=11;  //默认值

        if(this.currentChannel === "电影"){
            this.showScore = true;
        }else{
          this.showScore = false;
        }
        let params = {
          type: 'list'
        };
        this.$api.get('channel', params, r => {
          this.channelLists = r.data;
        })
      },
      filter(channelType,mode,isPurchase){
        this.$router.push({name: 'detail',params:{channelType: channelType,isPurchase:isPurchase,mode:mode}});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/color";
  #filter{
    margin: 10px;
  }
  .filter{
    border-bottom: 1px dotted $gray;
    padding: 5px ;
  }
  .filterTitle{
    font-size: 12px;
    color: $gray;
  }
  .filterCondition{
    display: inline-block;
    padding: 1px 7px 2px;
  }
  a{
    color: $dark;
    &:hover{
      color: $green;
    }
  }
  .selected a {
    background: $green;
    padding: 1px 7px 2px;
    color: $white;
    border-radius: 1px;
  }
</style>
