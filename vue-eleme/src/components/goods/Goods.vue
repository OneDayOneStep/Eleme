<template>
  <div class="goods">
    <div class="menu-wrapper" ref="mwrapper">
      <div>
        <div v-for="(m, index) of this.selectFoods"
             :key="'menus_'+ index"
             :class="{'menus': true,'choosing': choosing === index}"
             @click="choose(index, $event)"
        >{{ m.name }}</div>
      </div>
    </div>
    <div class="foods-wrapper" ref="fwrapper">
      <ul class="good-list">
        <li class="list-good" v-for="(good, g_index) of this.selectFoods" :key="'good_' + g_index" ref="goods">
          <h1 class="good-title">{{ good.name }}</h1>
          <ul class="food-list">
            <li class="list-food" v-for="(food, f_index) of good.foods" :key="'food_' + f_index">
              <div class="food-icon"><img :src="food.icon" /></div>
              <div class="food-info">
                <div class="food-name">{{ food.name }}</div>
                <div class="food-type" v-if="food.description">{{ food.description }}</div>
                <div class="food-count">
                  {{ '月售'+ food.sellCount +'份 好评率'+ food.rating +'%'}}
                </div>
                <div class="food-price">
                  <span class="current-price">{{ '￥'+ food.price }}</span>
                  <span class="old-price" v-if="food.oldPrice !== ''">{{ '￥'+ food.oldPrice }}</span>
                  <div class="choose-food">
                    <CartControl :food="food" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartcontrol/CartControl'
const ERR_OK = 0
export default {
  name: 'goods',
  data () {
    return {
      seller: {},
      goods: {},
      scrollTops: [],
      nowTop: 0
    }
  },
  props: {
    selectFoods: Array
  },
  methods: {
    choose (index, event) {
      if (!event._constructed) { // better-scroll 派发的事件才会有 _constructed
        return
      }
      this.FScroll.scrollToElement(this.$refs['goods'][index], 300)
    }
  },
  components: {
    CartControl
  },
  computed: {
    choosing () {
      if (this.scrollTops.length === 0) {
        return 0
      }
      for (let i = 0; i < this.scrollTops.length; i++) {
        if (this.scrollTops[i] + this.nowTop > 0) {
          return i - 1 < 0 ? 0 : i - 1
        }
      }
      return 0
    }
  },
  created () {
    this.axios.get('/api/data').then((result) => {
      if (result.data.errno === ERR_OK) {
        this.seller = result.data.data.seller
        this.$emit('changeFoods', result.data.data.goods)
        this.$nextTick(() => {
          let totalHeight = 0
          this.scrollTops.push(totalHeight)
          let list = this.$refs.fwrapper.getElementsByClassName('list-good')
          for (let i = 0; i < list.length; i++) {
            totalHeight += list[i].clientHeight
            this.scrollTops.push(totalHeight)
          }
          this.MScroll = new BScroll(this.$refs.mwrapper, {
            click: true
          })
          this.FScroll = new BScroll(this.$refs.fwrapper, {
            click: true,
            probeType: 2
          })
          this.FScroll.on('scroll', (xy) => {
            this.nowTop = xy.y
          })
          this.FScroll.on('scrollEnd', (xy) => {
            this.nowTop = xy.y
          })
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .goods{
    display: flex;
    position: absolute;
    top: 176px;bottom:45px;
    width:100%;overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      overflow: auto;
      padding-top:15px;
      .menus{
        display: flex;
        align-items: center;
        height: 54px;
        line-height: 14px;
        font-size: 12px;
        padding: 0 12px;
        position: relative;
        &:after{
          content: "";
          background: rgba(7,17,27,.1);
          height: 1px;
          position: absolute;
          top: 0;left: 12px;
          right: 12px;
        }
        &:first-child:after{
          display:none;
        }
      }
      .choosing{
        background:#FFF;
        &:after,& + .menus:after{
          display:none;
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .good-list{
        .good-title{
          height: 35px;line-height: 35px;
          border-left: rgba(7,17,27,.1) 3px solid;
          background: #f3f5f7;text-indent: 15px;
          font-weight: 600;color: rgba(7,17,27,.5)
        }
        .food-list{
          margin:0 18px;
          position: relative;
          .list-food{
            padding:18px 0;
            overflow: hidden;
            border-bottom: rgba(7, 17, 27, .1) 1px solid;
            &:last-child{
              border-bottom: none;
            }
            .food-icon{
              float: left;
              width: 100px;
              img{
                height: 100px;width: 100px;
              }
            }
            .food-info{
              margin-left:110px;
              font-size: 10px;
              padding-top: 4px;
              .food-name{
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
                font-weight: 600;
              }
              .food-type{
                line-height:15px;
                margin-top: 8px;
              }
              .food-count{
                margin-top: 8px;
              }
              .food-price{
                font-weight: 700;
                line-height: 24px;
                margin-top: 8px;
                position: relative;
                .current-price{
                  font-size: 14px;
                  color: red;
                }
                .old-price{
                  font-size: 10px;
                  color: rgb(147,153,159);
                  text-decoration: line-through;
                  margin-left:8px;
                }
                .choose-food{
                  position: absolute;bottom: -6px;right: 0px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
