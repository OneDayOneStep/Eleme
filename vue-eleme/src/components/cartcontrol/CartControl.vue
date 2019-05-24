<template>
  <span class="cartcontrol">
    <transition name="rotate">
      <span class="reduce-food icon-remove_circle_outline" @click="reduceFood()" v-show="food.count > 0"></span>
    </transition>
    <span class="food-number" >
      <transition name="fade">
        <span v-show="food.count > 0">
          {{ food.count === 0 ? "" : food.count }}
        </span>
      </transition>
    </span>
    <span class="add-food icon-add_circle" @click="addFood"></span>
  </span>
</template>

<script>
import Vue from 'vue/dist/vue.js'
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addFood (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartAdded', event.target)
    },
    reduceFood () {
      if (!event._constructed || this.food.count === 0) {
        return
      }
      this.food.count--
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/styles/Mixin.scss';
  .cartcontrol{
    width:80px;display:inline-block;text-align:right;
    .food-number{
      width: 25px;text-align: center;display: inline-block;
      vertical-align:top;height:24px;
      .fade-enter, .fade-leave-to{
        opacity: 0;
      }
      .fade-enter-active, .fade-leave-active{
        @include transition(opacity 1s);
      }
    }
    .add-food,.reduce-food{
      font-size:26px;color:rgb(0, 160, 220);display:inline-block;
    }
    .add-food{
      position:relative;z-index:1;
    }
    .reduce-food{
      @include transform(translate(0px) rotate(0deg));
    }
    .rotate-enter, .rotate-leave-to{
      @include transform(translate(50px) rotate(360deg));
      opacity: 0;
    }
    .rotate-enter-active, .rotate-leave-active{
      @include transition(transform 1s, opacity 1s);
    }
  }
</style>
