<template>
  <div>
    <Row>
      <Col :xs="24" :md="{span:22,offset:1 }">
        <div class="loading" v-if="loading">
          Loading...
        </div>
        <div v-if="channelLists">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              频道列表
            </p>
            <ul >
              <Row>
                <Col :xs="4" :md="2" v-for="item in channelLists">
                  <li class="channel">
                    <a @click="channelDetail(item.name)">{{ item.name }}</a>
                  </li>
                </Col>
              </Row>
            </ul>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        channelLists: null,
        loading: false,
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
        })
      },
      channelDetail(channelType){
          this.$router.push({name: 'detail',params:{channelType: channelType}});
      }
    }
  }
</script>

<style>
  .channel{
    display: inline-block;
  }
</style>
