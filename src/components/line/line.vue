<template>
    <div class="detail-title">
        <div class="line"></div>
        <div class="text">{{text}}</div>
        <div class="line"></div>
    </div>
</template>

<script>
  export default{
    props: {
        text: {
            type: String
        }
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  .detail-title
    display: flex
    width: 80%
    margin: 28px auto 24px auto
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
    .line
      position: relative
      flex: 1
      top: -6px
      border-bottom: 1px solid rgba(255, 255, 255, 0.2)
</style>
