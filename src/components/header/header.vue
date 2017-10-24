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
      <div class="support-count" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>
<style lang="stylus" rel="sytlesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
  color: rgb(255, 255, 255)
  background-color: #eee
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
          bd-image('brand')
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
            bd-image('decrease_1')
          &.discount
            bd-image('discount_1')
          &.guarantee
            bd-image('guarantee_1')
          &.invocie
            bd-image('invoice_1')
          &.special
            bd-image('special_1')
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
</style>
