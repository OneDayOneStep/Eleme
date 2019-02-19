<template>
  <div>
    123
    <appHeader />
    <div class='tabs'>
      <router-link tag='div' to='goods'   class='tab'>商品</router-link>
      <router-link tag='div' to='ratings' class='tab'>评论</router-link>
      <router-link tag='div' to='seller'  class='tab'>商家</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import appHeader from './components/Header'
export default {
  name: 'app',
  components: {
    appHeader
  }
}
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .tabs{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .tab{
      flex: 2;
      text-align: center;
    }
  }
}
</style>
