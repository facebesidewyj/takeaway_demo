<template>
  <transition name="move">
    <div class="food-wrapper" v-show="showFlag" ref="foodWrapper">
      <div class="image-header">
        <img :src="food.image" alt="商品图片">
        <div class="icon-wrapper" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="food-content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <transition name="fade">
          <div class="cart-btn" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        this.$set(this.food, 'count', 1);
        this.$root.eventHub.$emit('cartAdd', event.target);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  .food-wrapper
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    z-index: 30
    background: #fff
    transition: all 0.2s linear
    transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
      .icon-wrapper
        position: absolute
        left: 10px
        top: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          color: white
          font-size: 20px
    .food-content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        line-height: 14px
        color: rgb(7, 17, 27)
      .detail
        height: 10px
        margin-bottom: 18px
        font-size: 0
        line-height: 10px
        color: rgb(147, 153, 159)
        .sell-count
          font-size: 10px
          margin-right: 12px
        .rating
          font-size: 10px
      .price
          line-height: 24px
          .now
            margin-right: 8px
            font-weight: 700
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-weight: 700
            font-size: 10px
            color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .cart-btn
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        transition: all 0.2s
        &.fade-enter, &.fade-leave-to
          opacity: 0
        &.fade-enter-to, &.fade-leave
          opacity: 1
</style>
