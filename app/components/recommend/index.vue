<template>
  <div class="main recommend">
    <div v-if="recommends.length" class="slider-box">
        <slider>
            <li v-for="item in recommends">
                <a :href="item.linkUrl">
                    <img v-lazy="item.picUrl" />
                </a>
            </li>
        </slider>
    </div>
    <div class="recommend-list">
        <h2 class="list-title">热门歌单推荐{{$store.state.num}}</h2>
        <button @click="$store.commit('reduce')">-</button>  
        <button @click="$store.commit('add')">+</button>
        <ul>
            <li v-for="item in discList" class="item">
                <div class="ico">
                    <img :src="item.picurl" />
                </div>
                <div class="text">
                    <h6 v-html="item.mvtitle"></h6>
                    <p v-html="item.mvdesc"></p>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Slider from '../../base/slider/'
import {getRecommend, getDiscList} from '../../fetch/recommend'
import {ERR_OK} from '../../fetch/config'

export default {
    data() {
      return {
        recommends: [],
        discList: []
      } 
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if(res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if(res.code === ERR_OK) {
            this.discList = res.data.mvlist
          }
        })
      }
    },
    components: {
      Slider
    },
    watch: {
      //监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数
      $route(to, from) {
        // window.scrollTo(0,0);
      }
    },
    beforeRouteEnter(to,from,next){
      if(from.path == '/'){//当前页面刷新不需要切换位置
        next();
      }else{
        next(vm => {//后退时滚动条的位置为上一次保存的位置
            if(vm && vm.$store.state.home_top !== 0){//通过vm实例访问this
              setTimeout(function () {
                window.scrollTo(0,vm.$store.state.home_top);
              },0)//同步转异步操作
            }
        })
      }
    },
    beforeRouteLeave(to, from, next){
      let position = window.scrollY;
      this.$store.commit('SAVE_HOMETOP', position) //离开路由时把滚动条位置存起来
      next()
    }
}
</script>

<style scoped lang="less">
  @import '../../static/less/variable.less';
  @import '../../static/less/mixin.less';

  .recommend {
    .list-title {
      color: @color-theme;
      .text-c;
    }
    ul {
      li {
        padding: 0 20px 20px 20px;
        .d-flex;
        justify-content: flex-start;
        .ico {
          width:60px;
          padding-right: 15px;
          img {
              width:100%;
              .d-b;
          }
        }
        .text {
          h6 {
              .f-14;
          }
          p {
              color: @color-text-d;
          }
        }
      }
    }
  }    
</style>


