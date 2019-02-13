<template>
    <div class="tab">
        <ul>
            <router-link tag="li" class="tab-item" to="commend">
                <span class="tab-link">推荐</span>
            </router-link>
            <router-link tag="li" class="tab-item" to="singer">
                <span class="tab-link">歌手</span>
            </router-link>
            <router-link tag="li" class="tab-item" to="rank">
                <span class="tab-link">排行</span>
            </router-link>
            <router-link tag="li" class="tab-item" to="search">
                <span class="tab-link">搜索</span>
            </router-link>
      </ul>
  </div>
  
</template>

<script>
export default {}
</script>

<style scoped lang="less">
@import '../../static/less/variable';
@import '../../static/less/mixin';

.tab {
    padding-top: 10px;
    margin-bottom: 10px;
    .txt-ver(44px);
    ul {
        width:100%;
        .d-flex;
        .tab-item {
            flex: 1;
            .text-c;
            .tab-link {
                .f-14;
                padding-bottom:5px;
            }
            &.router-link-active {
                .tab-link {
                    color:@color-theme;
                    border-bottom:2px solid @color-theme;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

