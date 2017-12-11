<template>
    <span :class="classMap[type]"></span>
</template>

<script>
  export default{
    props: {
        type: {
            type: Number
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .decrease
    bg-image('img/decrease_4')
  .discount
    bg-image('img/discount_4')
  .guarantee
    bg-image('img/guarantee_4')
  .invoice
    bg-image('img/invoice_4')
  .special
    bg-image('img/special_4')
</style>
