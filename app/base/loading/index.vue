<template>
  <div class="loading">
      <img src="./loading.svg" />
      <p class="desc">{{text}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style lang="less" scoped>
    @import '../../static/less/variable.less';
    @import '../../static/less/mixin.less';

    .loading {
        width: 100%;
        .text-c;
        .desc {
            
        }
    }
</style>
