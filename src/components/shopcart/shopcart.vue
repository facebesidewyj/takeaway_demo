<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount > 0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass" @click.stop="pay">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="ball in balls" :key="ball.id">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price * food.count}}</span>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartAdd="drop"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="showMask">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
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
    },
    data() {
      return {
        balls: [
          {
            id: 1,
            show: false
          },
          {
            id: 2,
            show: false
          },
          {
            id: 3,
            show: false
          },
          {
            id: 4,
            show: false
          },
          {
            id: 5,
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
    created() {
      this.$root.eventHub.$on('cartAdd', this.drop);
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }
        return 'not-enough';
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        } else {
          // 与是否折叠取反
          let show = !this.fold;
          if (show) {
            this.$nextTick(() => {
                if (!this.scroll) {
                  this.scroll = new BScroll(this.$refs.listContent, {
                    click: true
                  });
                } else {
                  this.scroll.refresh();
                }
            });
          }
          return show;
        }
      }
    },
    methods: {
      drop(element) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];

          if (!ball.show) {
            ball.show = true;
            ball.element = element;

            // 将要下落的小球放入dropBall数组
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;

        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // 获得小球相对于视口的位置
            let rect = ball.element.getBoundingClientRect();

            // 获得x和y的偏移量
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);

            // 控制y方向的移动
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;

            // 让innerBall控制x的移动
            let innerBall = el.querySelector('.inner-hook');
            innerBall.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            innerBall.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el, done) {
        // 触发浏览器重绘
        /* eslint-disable no-unused-expressions */
        el.offsetHeight;

        // 在启动应用之前修改下列属性
        this.$nextTick(() => {
            // 重置y方向
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';

            // 重置x方向
            let innerBall = el.querySelector('.inner-hook');
            innerBall.style.webkitTransform = 'translate3d(0,0,0)';
            innerBall.style.transform = 'translate3d(0,0,0)';

            // 告诉vue动画结束
            el.addEventListener('transitionend', done);
          });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.fold = true;
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return '';
        }
        alert('请支付');
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          display: inline-block
          position: relative
          box-sizing: border-box
          top: -10px
          width: 56px
          height: 56px
          margin: 0 12px 2px 12px
          padding: 6px
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: rgb(255, 255, 255)
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin: 12px 0
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          line-height: 24px
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 100%
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter,&.drop-enter-active
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute;
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform:translate3d(0, -100%, 0)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height 40px
        padding: 0 18px
        line-height: 40px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left;
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        max-height: 217px
        padding: 0 18px
        background: white
        overflow: hidden
        .food
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            position: relative
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            display: inline-block
            position: absolute
            right: 90px
            bottom: 12px
            font-size: 14px
            line-height: 24px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    background: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)
    transition: all 0.5s
    &.showMask-enter-to
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
    &.showMask-enter, &.showMask-leave
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
