<template>
    <div class="rating-wrapper" ref="ratingsWrapper">
        <div class="rating">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="text">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                  <div class="star-wrapper">
                    <span class="text">商品评分</span>
                    <star class="star" :score="seller.foodScore" :size="36"></star>
                    <span class="score">{{seller.foodScore}}</span>
                  </div>
                  <div class="star-wrapper">
                    <span class="text">服务态度</span>
                    <star class="star" :score="seller.serviceScore" :size="36"></star>
                    <span class="score">{{seller.serviceScore}}</span>
                  </div>
                  <div class="delivery-wrapper">
                    <span class="text">送达时间</span>
                    <span class="time">{{seller.deliveryTime}}分钟</span>
                  </div>
                </div>
            </div>
            <splitBlock></splitBlock>
            <ratingSelect :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings" v-on:ratingtypeSelect="ratingtypeSelect" v-on:toggleOnlyContent="toggleOnlyContent"></ratingSelect>
            <div class="rating-content">
              <ul>
                <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
                  <div class="avatar">
                    <img :src="rating.avatar" alt="用户头像" width="28" height="28">
                  </div>
                  <div class="rating-desc">
                    <span class="username">{{rating.username}}</span>
                    <div class="star-wrapper">
                      <star class="star" :score="rating.score" :size="24"></star>
                      <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                    </div>
                    <p class="text">{{rating.text}}</p>
                    <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                      <i class="icon-thumb_up"></i>
                      <span class="rating-tag" v-for="tag in rating.recommend">{{tag}}</span>
                    </div>
                    <span class="date">{{rating.rateTime | formatDate}}</span>
                  </div>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import splitBlock from 'components/splitBlock/splitBlock';
  import ratingSelect from 'components/ratingselect/ratingselect';
  import util from '../../common/js/date.js';

  const ERROR_OK = 0;
  const ALL = 2;

  export default{
    props: {
        seller: {
            type: Object
        }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    methods: {
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
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERROR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratingsWrapper, {
              click: true
            });
          });
        }
      });
    },
    filters: {
      formatDate(time) {
        // 用filter来处理日期数据
        return util.formatDate(time, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      splitBlock,
      ratingSelect
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  .rating-wrapper
    position: absolute;
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .rating
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex: 0 0 137.5px
          width: 137.5px
          padding: 6px 0
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          @media screen and (max-device-width: 360px) and (min-device-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            margin-bottom: 6px
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .text
            margin-bottom: 8px
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .rank
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-right
          flex: 1
          padding: 6px 24px
          @media screen and (max-device-width: 360px) and (min-device-width: 320px)
            padding: 6px 0 6px 9px
          .star-wrapper
            margin-bottom: 8px
            font-size: 0
            .text, .star, .score
              display: inline-block
              vertical-align: top
            .text
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .star
              margin: 0 12px
            .score
              line-height: 18px
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            font-size: 0
            .text
              display: inline-block
              margin-right: 12px
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .time
              display: inline-block
              line-height: 18px
              font-size: 12px
              color: rgb(147, 153, 159)
      .rating-content
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          .avatar
            flex: 0 0 28px
            margin-right: 12px
            height: 28px
            width: 28px
            img
              border-radius: 50%
          .rating-desc
            position: relative
            flex: 1
            .username
              margin-bottom: 4px
              line-height: 12px
              font-size: 10px
              color: rgb(7, 17, 27)
            .star-wrapper
              margin-bottom: 6px
              font-size: 0
              .star
                display: inline-block
                vertical-align: top
                margin-right: 6px
              .delivery-time
                line-height: 12px
                font-size: 10px
                color: rgb(147, 153, 159)
            .text
              margin-bottom: 8px
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .recommend
              font-size: 0
              .icon-thumb_up
                margin-right: 8px
                line-height: 16px
                font-size: 12px
                color: rgb(0, 160, 220)
              .rating-tag
                padding: 0 6px
                margin-right: 8px
                margin-bottom: 4px
                border: 1px solid rgba(7, 17, 27, 0.1)
                border-radius: 1px
                line-height: 16px
                font-size: 9px
                color: rgb(147, 153, 159)
            .date
              position: absolute
              top: 0
              right: 0
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
</style>
