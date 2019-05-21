<template>
    <div class="shopcart">
      <transition name="fade">
        <div class="cartList" v-show="showingCartList" @click.self="showCartList">
          <transition name="slide">
            <div class="slideBox" v-show="showingCartList">
              <div class="cartList-title">
                购物车
                <span class="cartList-empty" v-show="totalPrice.CountFoods > 0" @click="FoodsEmpty">清空</span>
              </div>
              <div class="cartList-list" ref="cartwrapper">
                <div>
                  <div class="cartList-foods" v-for="(foods, index) of countFoods" :key="'foods_' + index">
                    <div class="cartList-food" v-for="(food, indexs) of foods.foods" :key="'food_' + indexs" :class="{haveCount: food.count > 0}">
                      <span class="cartList-food-name">{{ food.name }}</span>
                      <span class="food-price-control">
                        <span class="cartList-food-price">￥{{ food.price }}</span>
                        <CartControl :food="food" />
                      </span>
                    </div>
                  </div>
                  <div v-show="totalPrice.CountFoods === 0" class="NoFoods">暂未选择商品</div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
      <div class="iconBox" @click="showCartList">
        <div :class="{'shopIcon': true, 'haveFoods': totalPrice.CountFoods > 0}">
          <span class="icon-shopping_cart"></span>
          <span class="icon-totalFoods" v-show="totalPrice.CountFoods > 0">{{ totalPrice.CountFoods }}</span>
        </div>
      </div>
      <div class="currentMoney">￥{{ totalPrice.CountMoney }}元</div>
      <div class="tips">另需配送费￥{{ deliveryPrice }}元</div>
      <div class="how">
        {{ minPriceTips }}
        <div class="pay" v-show="totalPrice.CountMoney >= minPrice">结算</div>
      </div>
    </div>
</template>

<script>
import CartControl from '../cartcontrol/CartControl'
import BScrollCart from 'better-scroll'
export default {
  name: 'shopcart',
  data () {
    return {
      Price: 0,
      showingCartList: false
    }
  },
  components: {
    CartControl
  },
  methods: {
    showCartList () {
      this.showingCartList = !this.showingCartList
    },
    FoodsEmpty () {
      if (!confirm('是否清空购物车')) { return }
      this.countFoods.forEach((List) => {
        if (List.foods) {
          List.foods.forEach((Foods) => {
            if (Foods.count > 0) {
              Foods.count = 0
            }
          })
        }
      })
    }
  },
  mounted () {
    this.CartScroll = new BScrollCart(this.$refs.cartwrapper, {
      click: true
    })
  },
  watch: {
    showingCartList () {
      this.$nextTick(() => {
        this.CartScroll.refresh()
      })
    }
  },
  computed: {
    totalPrice () {
      let [CountFoods, CountMoney] = [0, 0]
      this.countFoods.forEach((List) => {
        if (List.foods) {
          List.foods.forEach((Foods) => {
            if (Foods.count > 0) {
              CountFoods += Foods.count
              CountMoney += Foods.count * Foods.price
            }
          })
        }
      })
      return {
        CountFoods, CountMoney
      }
    },
    minPriceTips () {
      if (this.totalPrice.CountMoney === 0) {
        return `￥${this.minPrice}元起送`
      } else {
        return `还差￥${this.minPrice - this.totalPrice.CountMoney}元起送`
      }
    }
  },
  props: {
    countFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/styles/Mixin.scss';
  .shopcart{
    position:absolute;bottom:0;
    height:45px;width:100%;
    background:#14172d;
    .iconBox{
      height:56px;width:56px;
      background:#14172d;
      @include border-radius(50%);
      position:absolute;left:12px;
      bottom:2px;padding:6px;z-index:30;
      @include box-sizing;
      .shopIcon{
        background:#2B343C;
        height: 44px;width: 44px;
        text-align:center;
        &.haveFoods{
          background:rgb(0, 160, 220);
          .icon-shopping_cart{
            color:#FFF;
          }
        }
        @include border-radius(50%);
        .icon-shopping_cart{
          color:#80858A;font-size:28px;
          line-height:44px;
        }
        .icon-totalFoods{
          position: absolute;
          top: 0;right: 0;
          background: red;color: #FFF;
          height: 20px;font-weight: 600;
          padding: 0 10px;font-size: 10px;
          line-height: 19px;
          @include border-radius(10px);
          @include box-shadow(0 3px 5px rgba(0, 0, 0, .4));
        }
      }
    }
    .currentMoney{
      float:left;height:45px;line-height:45px;
      margin-left:65px;color:rgba(255, 255, 255, .5);
      font-weight:700;font-size:18px;
      &:after{
        content:"";position:absolute;
        height:28px;margin:8px 0 0 10px;
        width:1px;background:rgba(255, 255, 255, .2);
      }
    }
    .tips{
      float:left;height:45px;font-size:13px;
      line-height:44px;margin-left:20px;
      color:rgba(255,255,255,.4);
    }
    .how{
      float:right;font-size:10px;font-weight:600;
      width:100px;text-align:center;
      line-height:45px;height:45px;
      background:rgba(255, 255, 255, .2);
      color:#CCC;position:relative;
      .pay{
        position:absolute;top:0;left:0;height:45px;
        width:100%;z-index:1;background:#009FE3;
        color:#FFF;text-align:center;line-height:45px;
        font-size:16px;font-weight:600;
      }
    }
    .cartList{
      position: fixed;top:0;left:0;right:0;bottom:45px;
      background: rgba(7,17,27,.6);z-index:20;
      display: flex;flex-direction: column-reverse;
      overflow:hidden;
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
      &.fade-enter-active, &.fade-leave-active{
        @include transition(opacity .5s);
      }
      .slideBox{
        @include transform(translateY(0));
        &.slide-enter, &.slide-leave-to{
          @include transform(translateY(100%));
        }
        &.slide-enter-active, &.slide-leave-active{
          @include transition(transform .8s);
        }
        display: flex;flex-direction: column;
        max-height: 70%;
        .cartList-title{
          background: #f3f5f7;height: 40px;line-height: 40px;
          color:rgb(7,17,27);font-size:14px;padding:0 18px;
          border-bottom:#E5E5E5 2px solid;
          .cartList-empty{
            color:rgb(0,160,220);font-size:14px;
            font-weight:600;float:right;
          }
        }
        .cartList-list {
          background: #FFF;flex: 1;
          padding: 0 18px;overflow: hidden;
          .NoFoods{
            height:80px;line-height:80px;text-align: center;
          }
          .cartList-foods{
            .cartList-food{
              height:48px;line-height:48px;border-bottom:#E5E5E5 1px solid;
              display:none;
              &.haveCount{
                display:block;
              }
              .cartList-food-name{
                color:#000;
              }
              .food-price-control{
                float:right;
                .cartList-food-price{
                  margin-right:15px;color:red;
                }
                .cartcontrol /deep/ > .add-food,.cartcontrol /deep/ > .reduce-food{
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
