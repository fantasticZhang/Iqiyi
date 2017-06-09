<template>
  <div>
    <Menu mode="horizontal" theme="dark">
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <Col span="6">
        <Menu-item name="logo">
        <img class="logo" src="/static/logo.png" @click="homePage">
        </Menu-item>
        </Col>
        <Col span="12"  >
        <Menu-item name="search">
          <Input v-model="keyword" style="width: 300px;" placeholder="奔跑吧">
          <Button icon="ios-search" slot="append" @click="search">搜索</Button>
          </Input>
        </Menu-item>
        </Col>
      </Row>

    </Menu>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          keyword: "奔跑吧"
      }
    },
    methods: {
      search(){
          this.$router.push({name: 'search', params: {keyword: this.keyword}})
      },
      homePage(){
          this.$router.push('/');
      }
    }
  }
</script>

<style >
  .logo{
    vertical-align: middle;
  }
</style>
