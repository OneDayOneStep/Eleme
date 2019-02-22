<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description + ' / ' + seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support" @click="more">
          <span :class="['icon', clasies[seller.supports[0].type]]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="more">
      <div class="bulletin-icon">
        <span class="icon bulletin"></span>
      </div>
      <div class="bulletin-title">{{ seller.bulletin }}</div>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
    <transition name="fade">
      <div class="detail" v-show="detail">
        <div class="scroll">
          <div class="name">{{ seller.name }}</div>
          <div class="score">
            <Star :score="seller.score" :starNum="5"/>
          </div>
          <div class="line-title">
            <span class="line"><span></span></span>
            <span class="info">优惠信息</span>
            <span class="line"><span></span></span>
          </div>
          <div class="sale">
            <div v-for="(s, index) of seller.supports" :key="'supports'+ index" class="supports">
              <span :class="['icon', clasies[s.type]]"></span>
              <span class="info">{{ s.description }}</span>
            </div>
          </div>
          <div class="line-title">
            <span class="line"><span></span></span>
            <span class="info">商家公告</span>
            <span class="line"><span></span></span>
          </div>
          <div class="msg">{{ seller.bulletin }}</div>
        </div>
        <div class="closeBar">
          <div class="icon-close" @click="closing"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from 'common/components/Star'
export default {
  name: 'appHeader',
  data () {
    return {
      clasies: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      detail: false
    }
  },
  components: {
    Star
  },
  props: {
    seller: Object
  },
  methods: {
    more () {
      this.detail = true
    },
    closing () {
      this.detail = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/styles/Mixin.scss';
  .header{
    position:relative;
    background: rgba(0, 0, 0, .2);
    overflow: hidden;
    color:#FFF;
    .content-wrapper{
      padding:24px 12px 18px 24px;
      fonts-size:0;
      .avatar{
        display:inline-block;
        vertical-align:top;
        img{
          @include border-radius(2px)
        }
      }
      .content{
        display:inline-block;
        margin-left:16px;
        font-size: 14px;
        .title{
          margin:2px 0 8px 0;
          font-weight:600;
          .brand{
            vertical-align:top;
            width:30px;
            height:18px;
            display:inline-block;
            @include bg-image("images/brand");
            background-size:cover;
          }
          .name{
            margin-left:4px;
            vertical-align:middle;
          }
        }
        .description{
          margin-bottom:10px;
          font-size:12px;
          line-height:12px;
        }
        .support{
          .icon{
            margin-right:4px;
            &.decrease{
              @include icon('images/decrease_1', 12px, 12px)
            }
            &.discount{
              @include icon('images/discount_1', 12px, 12px)
            }
            &.guarantee{
              @include icon('images/guarantee_1', 12px, 12px)
            }
            &.invoice{
              @include icon('images/invoice_1', 12px, 12px)
            }
            &.special{
              @include icon('images/special_1', 12px, 12px)
            }
          }
          .text{
            line-height:12px;
            font-size:10px;
            vertical-align:top;
          }
        }
      }
    }
    .bulletin-wrapper{
      display: flex;
      height:28px;
      line-height:28px;
      padding:0 12px;
      background: rgba(0, 0, 0, .3);
      .bulletin-icon{
        .icon{
          margin-right:4px;
          &.bulletin{
            @include icon('images/bulletin', 22px, 12px)
          }
        }
      }
      .bulletin-title{
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
        line-height: 26px;
      }
    }
    .background{
      position: absolute;
      top:0;left:0;width:100%;
      height:100%;z-index: -1;
      filter:blur(10px);
    }
    .detail{
      position: fixed;z-index: 10;
      top: 0;left: 0;right: 0;bottom: 0;
      background: rgba(7, 17, 27, .8);
      backdrop-filter: blur(10px);
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
      &.fade-enter-active, &.fade-leave-active{
        transition: opacity 1s;
      }
      .scroll {
        position:absolute;
        top:0;left:0;width:100%;
        bottom:100px;overflow:auto;
        .name {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          margin: 64px 0 16px;
        }
        .score{
          text-align:center;
          height:24px;
        }
        .line-title {
          display: flex;
          height: 20px;
          line-height: 20px;
          padding: 28px 36px;
          .info {
            padding: 0 12px;
            font-size: 16px;
            font-weight: 600;
          }
          .line {
            flex: 1;
            line-height: 12px;
            span {
              background: rgba(255, 255, 255, .3);
              height: 2px;
              width: 100%;
              display: inline-block;
            }
          }
        }
        .sale {
          padding: 0 48px;
          .supports {
            height: 12px;
            line-height: 12px;
            margin-bottom: 12px;
            .icon {
              margin-right: 4px;
              vertical-align: middle;
              &.decrease {
                @include icon('images/decrease_1', 16px, 16px)
              }
              &.discount {
                @include icon('images/discount_1', 16px, 16px)
              }
              &.guarantee {
                @include icon('images/guarantee_1', 16px, 16px)
              }
              &.invoice {
                @include icon('images/invoice_1', 16px, 16px)
              }
              &.special {
                @include icon('images/special_1', 16px, 16px)
              }
            }
            .info {
              font-size: 12px;
            }
          }
        }
        .msg {
          padding: 0 48px;
          line-height: 24px;
          font-size: 12px;
        }
      }
      .closeBar{
        position:absolute;
        bottom:35px;width:100%;left:0;
        text-align:center;height:32px;
        .icon-close{
          font-size:32px;
        }
      }
    }
  }
</style>
