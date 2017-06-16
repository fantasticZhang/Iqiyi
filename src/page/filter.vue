<template>
  <section id="filter">
    <Card shadow>
      <div class="filter">
        <Row type="flex" justify="start" align="top" class="code-row-bg">
        <Col :xs="24"  :md="1">
        <span class="filterTitle">频道：</span>
        </Col>
          <Col :xs="24"  :md="23">
          <ul >
            <Row>
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
          <Col :xs="24"  :md="1">
          <span class="filterTitle">资费：</span>
          </Col>
          <Col :xs="24"  :md="23">
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
          <Col :xs="24"  :md="1">
          <span class="filterTitle">排序：</span>
          </Col>
          <Col :xs="24"  :md="23">
          <ul >
            <Row type="flex" justify="start" align="top" class="code-row-bg">
              <Col :xs="4" :md="2" >
              <li :class="{filterCondition: true , selected: mode === 11}">
                <a @click="filter(currentChannel,11,isPurchase)">热门</a>
              </li>
              </Col>
              <Col :xs="5" :md="2" >
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
        if(this.$route.params.channelType) {
            this.currentChannel = this.$route.params.channelType;
        }else{
            this.currentChannel="电影";
        }  //默认值
        if( this.$route.params.isPurchase) {
            this.isPurchase = this.$route.params.isPurchase;
        }else{
            this.isPurchase=0;
        }  //默认值

        if(this.$route.params.mode){
            this.mode = this.$route.params.mode;
        }else{
            this.mode=11;
        }  //默认值

        if(this.currentChannel === "电影"){
          this.showScore = true;
        }else{
          this.showScore = false;
        }
        window.console.log(this.currentChannel+ " "+ this.mode +" "+ this.isPurchase);
        let params = {
          type: 'list'
        };
        this.$api.get('channel', params, r => {
          this.channelLists = r.data;
        })
      },
      filter(channelType,mode,isPurchase){
        if(channelType!=="电影"){
            mode = 11;
        }
        this.$router.push({name: 'detail',params:{channelType: channelType,isPurchase:isPurchase,mode:mode}});
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../style/color";
  #filter{
    margin: 10px 0;
  }
  .filter{
    border-bottom: 1px dotted $gray;
    padding: 5px 1px;
  }
  .filterTitle{
    font-size: 12px;
    color: $gray;
  }
  .filterCondition{
    display: inline-block;
    padding: 2px;
  }
  a{
    color: $dark;
    &:hover{
      color: $green;
    }
  }
  .selected a {
    background: $green;
    padding: 2px;
    color: $white;
    border-radius: 1px;
  }
</style>
