<template>
  <transition name="move">
    <div class="food-wrapper" v-show="showFlag" ref="foodWrapper">
      <div class="food">
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
            <cartcontrol :food="food" v-on:cartAdd="transfer"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="cart-btn" @click.stop.prevent="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <splitBlock v-if="food.info"></splitBlock>
        <div class="food-info" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="info-content">{{food.info}}</p>
        </div>
        <splitBlock></splitBlock>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingtypeSelect="ratingtypeSelect" v-on:toggleOnlyContent="toggleOnlyContent"></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user-info">
                  <span class="username">{{rating.username}}</span>
                  <img class="user-img" :src="rating.avatar" alt="用户头像" width="12" height="12">
                </div>
                <div class="rating-date">{{rating.rateTime | formatDate}}</div>
                <p class="rating-text">
                  <i :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></i>
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import splitBlock from 'components/splitBlock/splitBlock';
  import ratingSelect from 'components/ratingselect/ratingselect';
  import util from '../../common/js/date.js';

  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            // better-scroll原理是子元素要比父元素高
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
        this.$emit('cartAdd', event.target);
      },
      transfer(target) {
        // 继续向父组件传递事件
        this.$emit('cartAdd', event.target);
      },
      ratingtypeSelect(type) {
        this.selectType = type;
        // better-scroll重新计算高度
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleOnlyContent(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        // 只看内容并且评论内容为空，则不显示
        if (this.onlyContent && !text) {
          return false;
        }

        // 显示所有
        if (this.selectType === ALL) {
          return true;
        } else {
          // 显示与高亮按钮相对应的
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time) {
        // 用filter来处理日期数据
        return util.formatDate(time, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      splitBlock,
      ratingSelect
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus" scoped>
  @import '../../common/stylus/mixin.styl'
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
    .food-info
      padding: 18px
      .title
        margin-bottom: 6px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .info-content
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        margin-left: 18px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user-info
            position: absolute
            font-size: 0
            right: 0
            top: 16px
            line-height: 12px
            .username
              display: inline-block
              vertical-align: top
              margin-right: 6px
              font-size: 10px
              color: rgb(147, 153, 159)
            .user-img
              display: inline-block
              width: 12px
              height: 12px
              vertical-align: top
              border-radius: 50%
          .rating-date
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .rating-text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
