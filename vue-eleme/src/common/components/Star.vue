<template>
    <div class="Stars">
      <span v-for="(st, index) of star" :class="['icon', st]" :key="'icon_' + index"></span>
    </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    score: Number,
    starNum: Number
  },
  computed: {
    star () {
      let tscore = this.score || 0
      let gscore = tscore.toFixed(1).split('.')
      let [stars, on, half, off] = [[], gscore[0], gscore[1], 0]
      for (let i = 0; i < on; i++) {
        stars.push('on')
      }
      if (half >= 5) {
        stars.push('half')
      }
      off = this.starNum - stars.length
      for (let k = 0; k < off; k++) {
        stars.push('off')
      }
      return stars
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'common/styles/Mixin.scss';
  .Stars{
    display:inline-block;
    .icon{
      margin:0 8px;
      &.on{
        @include icon("images/star24_on", 20px, 19px)
      }
      &.off{
        @include icon("images/star24_off", 20px, 19px)
      }
      &.half{
        @include icon("images/star24_half", 20px, 19px)
      }
    }
  }
</style>
