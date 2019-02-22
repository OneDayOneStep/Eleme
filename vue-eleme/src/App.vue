<template>
  <div class="app">
    <appHeader :seller="seller" />
    <div class='tabs border-OnePx'>
      <router-link tag='div' to='goods'   class='tab'>商品</router-link>
      <router-link tag='div' to='ratings' class='tab'>评论</router-link>
      <router-link tag='div' to='seller'  class='tab'>商家</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import appHeader from 'components/header/Header'

const ERR_OR = 0

export default {
  name: 'app',
  components: {
    appHeader
  },
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.axios.get('/api/seller').then((result) => {
      if (result.data.errno === ERR_OR) {
        this.seller = result.data.data.seller
        console.log(this.seller)
      }
    })
  },
  mounted () {
    this.$router.push('goods')
  }
}
</script>

<style lang='scss'>
@import 'common/styles/Mixin.scss';
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .tabs{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-OnePx(rgba(7, 17, 27, .1));
    .tab{
      flex: 2;
      text-align: center;
      color: black;
      font-size: 14px;
      color: rgb(77, 85, 93);
    }
    .router-link-active{
      color: rgb(240, 20, 20);
    }
  }
}
</style>
