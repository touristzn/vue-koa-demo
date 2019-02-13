<template>
  <div class="main search">
      <div class="search-box-wrapper">
          <search-box ref="searchBox"/>
      </div>
      <div class="mod_search_result">
          <h3>热门搜索</h3>
          <div class="result_tags">
              <a @click="addQuery(item.k)" href="javascript:;" v-for="item in hotKey" class="tag_s">
                  <span>{{item.k}}</span>
              </a>
          </div>
      </div>
  </div>
</template>

<script>
  import SearchBox from '../../base/search-box';
  import {getHotKey} from '../../fetch/search'
  import {ERR_OK} from '../../fetch/config'

  export default {
    created() {
        this._getHotKey()
    },
    data() {
        return {
            hotKey: []
        }
    },
    methods: {
        addQuery(query) {
            this.$refs.searchBox.setQuery(query)
        },
        _getHotKey() {
            getHotKey().then((res) => {
                if(res.code === ERR_OK) {
                    this.hotKey = res.data.hotkey.slice(0 ,10)
                }
            })
        }
    },
    components: {
        SearchBox
    }
  }
</script>

<style scoped lang="less">
    @import '../../static/less/variable.less';
    @import '../../static/less/mixin.less';

    .search {
        .mod_search_result {
            padding:20px 15px;
            h3 {
                margin-bottom: 15px;
            }
            .tag_s {
                .d-ib;
                .f-14;
                padding:0 10px;
                .txt-ver(30px);
                color: @color-text-l;
                border: 1px solid @color-text-d;
                border-radius: 99px;
                margin-bottom: 10px;
                margin-right: 14px;
            }
        }
    }
</style>


