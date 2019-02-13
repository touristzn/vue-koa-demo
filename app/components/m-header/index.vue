<template>
  <div class="m-header">
    <h1>
      <i class="icon" />
      <span>Chicken Music</span>
    </h1>
    <tab/>
  </div>
</template>

<script>
  import Tab from '../tab'

  export default {
    components: {
      Tab
    }
  }
</script>

<style scoped lang="less">
  @import "../../static/less/variable.less";
  @import "../../static/less/mixin.less";

  .m-header {
    width:100%;
    .bg-color(@color-background);
    padding-top: 10px;
    .pos(f);
    z-index: 10;
    
    h1 {
      .txt-ver(44px);
      .text-c;

      .icon {
        .wh-unlike(30px,32px);
        .bg('../../static/images/default.png');
        .bg-size(30px 32px);
        margin-right: 9px;
        vertical-align: middle;
        .d-ib;
      }
      span {
        color: @color-theme;
      }
    }
  }
</style>


