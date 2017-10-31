<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
    </div>
</template>

<script>
  // 定义一些常量
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default{
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            let result = [];

            // 将不规则小数转换成只有.5的规则小数
            let score = Math.floor(this.score * 2) / 2;

            // 判断是否为小数
            let hasDecimal = score % 1 !== 0;

            // 取整，用来计算实心星星个数
            let integer = Math.floor(this.score);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }

            // 获得半星
            if (hasDecimal) {
                result.push(CLS_HALF);
            }

            // 如果星星数量不足5个，则用无心星星补齐
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size: 0
    &.star-48
      .star-item
        width: 20px
        height: 20px
        background-size: 20px 20px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.off
          bg-image('star48_off')
        &.half
          bg-image('star48_half')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        background-size: 15px 15px
        margin-right: 6px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        background-size: 10px 10px
        margin-right: 3px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')
    .star-item
        display: inline-block
        background-repeat: no-repeat
</style>
