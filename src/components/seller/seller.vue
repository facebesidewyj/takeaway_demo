<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div>
      <div class="overview">
        <div class="seller-desc border-1px">
          <h1>{{seller.name}}</h1>
          <div class="star-wrapper">
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="seller-ratingcount">({{seller.ratingCount}})</span>
            <span class="seller-sellcount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <ul class="seller-desc-other">
          <li class="mark">
            <div class="text">起送价</div>
            <span class="info">{{seller.minPrice}}</span>元
          </li>
          <li class="mark">
            <div class="text">商家配送</div>
            <span class="info">{{seller.deliveryPrice}}</span>元
          </li>
          <li class="mark">
            <div class="text">平均配送时间</div>
            <span class="info">{{seller.deliveryTime}}</span>分钟
          </li>
        </ul>
        <div class="favourite-wrapper" @click="toggleFavourite">
          <i class="icon-favorite" :class="{'active':favourite}"></i>
          <span class="text">{{favouriteText}}</span>
        </div>
      </div>
      <splitBlock></splitBlock>
      <div class="bulletin-wrapper">
        <div class="text border-1px">
          <h1>公告与活动</h1>
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="supports-item border-1px" v-for="item in seller.supports">
            <icon class="icon" :type="item.type"></icon>
            <span class="supports-text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <splitBlock></splitBlock>
      <div class="seller-pic">
        <h1>商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="seller-pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" alt="商家实景" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <splitBlock></splitBlock>
      <div class="seller-info-wrapper">
        <h1>商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import splitBlock from 'components/splitBlock/splitBlock';
  import icon from 'components/icon/icon';

  export default{
    props: {
      seller: {}
    },
    data() {
      return {
        favourite: false
      };
    },
    computed: {
      favouriteText() {
        return this.favourite ? '已收藏' : '收藏';
      }
    },
    mounted: function() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.sellerWrapper, {
          click: true
        });
      });

      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let totalWidth = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = totalWidth + 'px';
        this.$nextTick(() => {
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        });
      }
    },
    methods: {
      toggleFavourite() {
        this.favourite = !this.favourite;
      }
    },
    components: {
      star,
      splitBlock,
      icon
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .seller-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .seller-desc
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        h1
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .star-wrapper
          font-size: 0
          .star
            display: inline-block
            vertical-align: top
            margin-right: 8px
          .seller-ratingcount
            margin-right: 12px
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
          .seller-sellcount
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
      .seller-desc-other
        display: flex
        padding-top: 18px
        .mark
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          font-size: 10px
          color: rgb(7, 17, 27)
          &:last-child
            border: none
          .text
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .info
            line-height: 24px
            font-size: 24px
            color: rgb(7, 17, 27)
      .favourite-wrapper
        position: absolute
        width: 50px
        top: 18px
        right: 11px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          line-height: 24px
          font-size: 24px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin-wrapper
      padding: 0 18px
      .text
        padding: 18px 0 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        h1
          margin-bottom: 8px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .content
          padding: 0 12px
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        .supports-item
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            display: inline-block
            width: 16px
            height: 16px
            margin-right: 6px
            vertical-align: top
            background-size: 16px 16px
            background-repeat: no-repeat
          .supports-text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
    .seller-pic
      padding: 18px 0 18px 18px
      h1
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .pic-wrapper
        width: 100%
        overflow: hidden
        .seller-pic-list
          font-size: 0
          white-space: nowrap
          .pic-item
            display: inline-block
            width: 120px
            height: 90px
            margin-right: 6px
            &:last-child
              margin: 0
    .seller-info-wrapper
      padding: 18px
      h1
        padding-bottom: 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 14px
        color: rgb(7, 17, 27)
      .info-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
        &:last-child
          border-none()
</style>
