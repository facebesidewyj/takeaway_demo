<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <!-- 外层负责平移，内层负责滚动 -->
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        // 如果商品数量不存在就置为1，否则就加1
        if (!this.food.count) {
          // 为不存在的属性赋值时，需要vue.set才能监控到
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

        // 发起事件广播
        this.$bus.emit('cartAdd', event.target);
      },
      decreaseCart() {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160 220)
        transform: rotate(0)
        /* 控制滚动动画 */
        transition: all 0.4s linear
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter-to, move-leave
        opacity: 1
        transform: translate3d(0, 0, 0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)
        /* inner要定义在move-enter里面，因为move-enter成功后会被移除 */
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160 220)
</style>
