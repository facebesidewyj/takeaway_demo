<template>
    <span :class="classMap[type]"></span>
</template>

<script>
  export default{
    props: {
        type: {
            type: Number
        },
        imageType: {
          type: Number
        }
    },
    created() {
      if (this.imageType === 1) {
        this.classMap = ['decrease-1', 'discount-1', 'special-1', 'invoice-1', 'guarantee-1'];
      } else if (this.imageType === 2) {
        this.classMap = ['decrease-2', 'discount-2', 'special-2', 'invoice-2', 'guarantee-2'];
      } else if (this.imageType === 3) {
        this.classMap = ['decrease-3', 'discount-3', 'special-3', 'invoice-3', 'guarantee-3'];
      } else if (this.imageType === 4) {
        this.classMap = ['decrease-4', 'discount-4', 'special-4', 'invoice-4', 'guarantee-4'];
      }
    }
  };
</script>

<style lang="stylus" rel="sytlesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .decrease-1
    bg-image('decrease_1')
  .discount-1
    bg-image('discount_1')
  .guarantee-1
    bg-image('guarantee_1')
  .invoice-1
    bg-image('invoice_1')
  .special-1
    bg-image('special_1')

  .decrease-2
    bg-image('decrease_2')
  .discount-2
    bg-image('discount_2')
  .guarantee-2
    bg-image('guarantee_2')
  .invoice-2
    bg-image('invoice_2')
  .special-2
    bg-image('special_2')

  .decrease-3
    bg-image('decrease_3')
  .discount-3
    bg-image('discount_3')
  .guarantee-3
    bg-image('guarantee_3')
  .invoice-3
    bg-image('invoice_3')
  .special-3
    bg-image('special_3')

  .decrease-4
    bg-image('decrease_4')
  .discount-4
    bg-image('discount_4')
  .guarantee-4
    bg-image('guarantee_4')
  .invoice-4
    bg-image('invoice_4')
  .special-4
    bg-image('special_4')
</style>
