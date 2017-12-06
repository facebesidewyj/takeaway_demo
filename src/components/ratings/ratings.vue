<template>
    <div class="rating-wrapper">
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
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  .rating-wrapper
    position: absulote
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
</style>
