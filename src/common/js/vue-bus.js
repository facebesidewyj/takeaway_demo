/**
 * 中央事件总线插件vue-bus
 * @param  {Object} Vue 传入的Vue对象
 */
export default function(Vue) {
  const Bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      }
    }
  });
  Vue.prototype.$bus = Bus;
};
