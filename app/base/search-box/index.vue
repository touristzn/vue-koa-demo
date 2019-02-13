<template>
  <div class="search-box">
    <i class="iconfont icon-sousuo"></i>
    <input ref="query" v-model="query" :placeholder="placeholder" class="box" />
    <i @click="clear" v-show="query" class="iconfont icon-close1"></i>
  </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '搜索歌曲、歌手'
            }
        },
        data() {
            return {
                query: ''
            }
        },
        methods: {
            clear() {
                this.query = ''
            },
            setQuery(query) {
                this.query = query
            }
        },
        created() {
            this.$watch('query', (newQuery) => {
                this.$emit('query', newQuery)
            })
        }
    }
</script>


<style lang="less" scoped>
    @import '../../static/less/variable.less';
    @import '../../static/less/mixin.less';

    .search-box {
        width:96%;
        height: 40px;
        padding:0 6px;
        .bg-color(@color-highlight-background);
        .hc;
        border-radius: 6px;
        .d-flex;
        align-items: center;
        .icon-sousuo {
            font-size: 24px;
            color: @color-background;
        }
        .box {
            margin: 0 5px;
            line-height: 18px;
            background: @color-highlight-background;
            color: @color-text;
            .f-14;
            flex: 1;
            &::placeholder {
                color: @color-text-d;
            }
        }
        .icon-dismiss {
            font-size: 16px;
            color: @color-background;
        }
    }
</style>
