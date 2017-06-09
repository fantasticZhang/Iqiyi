<template>
  <div>
    <div id="computerMenu" >
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

    <div id="phoneMenu">
      <Menu mode="horizontal" theme="dark">
          <Menu-item name="logo">
            <img class="logo" src="/static/logo.png" @click="homePage">
          </Menu-item>
      </Menu>
      <section id="phoneSearch">
      <Row type="flex" justify="center" class="code-row-bg">
        <Col>
          <Input v-model="keyword" style="width: 300px;" placeholder="奔跑吧">
          <Button icon="ios-search" slot="append" @click="search">搜索</Button>
          </Input>
        </Col>
      </Row>
      </section>
    </div>
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
  @media(min-width:769px) {
    #computerMenu{
      display: block;
    }
    #phoneMenu{
      display: none;
    }
  }
  @media(max-width: 768px){
    #computerMenu{
      display: none;
    }
    #phoneMenu{
      display: block;
      text-align: center;
    }
    #phoneSearch{
      height: 50px;
      padding: 8px;
    }
  }
</style>
