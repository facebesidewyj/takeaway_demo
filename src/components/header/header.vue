<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="商家图标">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar" alt="背景图片">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="detailClose">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      detailClose() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    }
  };
</script>
<style lang="stylus" rel="sytlesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  position: relative
  overflow: hidden
  color: rgb(255, 255, 255)
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      display: inline-block
      margin-left: 16px
      padding: 2px 0
      .title
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          display: inline-block
          margin-left: 6px
          line-height: 18px
          font-size: 16px
          font-weight: bold
      .description
        margin-top: 8px
        line-height: 12px
        font-size: 12px
      .support
        margin-top: 10px
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invocie
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          display: inline-block
          margin-left 4px
          line-height: 12px
          font-size 10px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      padding: 0 8px
      height 24px
      line-height: 24px
      border-radius: 14px
      background-color: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        line-height: 24px
        margin-left: 2px
        font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    padding: 0 22px 0 12px
    line-height: 28px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    background-color: rgba(7, 17, 27, 0.2);
    .bulletin-title
      display: inline-block
      height: 12px
      width: 22px
      vertical-align: top
      margin-top: 9px
      bg-image('bulletin')
      background-repeat: no-repeat
      background-size: 22px 12px
    .bulletin-text
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      right: 12px
      top: 10px
      font-size: 10px
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
  .detail
    position: fixed
    top: 0
    left: 0
    z-index: 100
    height: 100%
    width: 100%
    background-color: rgba(7, 17, 27, 0.8)
    overflow: auto
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          font-size: 16px
          font-weight: 700
          text-align: center
        .star-wrapper
          margin-top: 16px
          padding: 2px 0
          text-align: center
    .detail-close
        position: relative
        margin: -64px auto 0 auto
        font-size: 32px
        width: 32px
        height: 32px
        color: rgba(255, 255, 255, 0.5)
        clear: both
</style>
