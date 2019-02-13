<template>
    <div class="slider-wrapper" ref="slider">
        <ul class="slider-group" ref="sliderGroup">
            <slot/>
        </ul>
        <div class="dots">
            <span class="dota" v-for="(item,index) in dots" :class="{active : currentIndex === index}"/>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {addClass} from '../../static/util/dom'

    export default {
        name: 'slider',
        data() {
            return {
                dots: [],
                currentIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();

                if(this.autoPlay) {
                    this._play();
                }
            })

            window.addEventListener('resize', () => {
                if (!this.slider || !this.slider.enabled) {
                return
                }
                clearTimeout(this.resizeTimer)
                this.resizeTimer = setTimeout(() => {
                if (this.slider.isInTransition) {
                    this._onScrollEnd()
                } else {
                    if (this.autoPlay) {
                    this._play()
                    }
                }
                this.refresh()
                }, 60)
            })
        },
        activated() {
            this.slider.enable()
            let pageIndex = this.slider.getCurrentPage().pageX
            this.slider.goToPage(pageIndex, 0, 0)
            this.currentPageIndex = pageIndex

            if (this.autoPlay) {
                this._play()
            }
        },
        deactivated() {
            this.slider.disable()
            clearTimeout(this.timer)
        },
        beforeDestroy() {
            this.slider.disable()
            clearTimeout(this.timer)
        },
        methods: {
            refresh() {
                if (this.slider) {
                this._setSliderWidth(true)
                this.slider.refresh()
                }
            },
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children

                let width = 0;
                let sliderWidth = document.body.clientWidth;
                for(let i=0; i < this.children.length; i++) {
                    let child = this.children[i];
                    addClass(child, 'slider-item');

                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }

                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'

            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    }
                })

                this.slider.on('scrollEnd', this._onScrollEnd)

                this.slider.on('touchend', () => {
                    if (this.autoPlay) {
                        this._play()
                    }
                })

                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _onScrollEnd() {
                let pageIndex = this.slider.getCurrentPage().pageX
                this.currentIndex = pageIndex
                if (this.autoPlay) {
                    this._play()
                }
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _play() {
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.slider.next()
                }, this.interval)
            }
        }
    }
</script>

<style scoped lang="less">
    @import '../../static/less/variable.less';
    @import '../../static/less/mixin.less';

    .slider-wrapper {
        width:100%;
        .pos(r);
        .slider-group {
            white-space: nowrap;
            .slider-item {
                .d-ib;
                a {
                    width:100%;
                    img {
                        width:100%;
                        .d-b;
                        &[lazy=loading]{
                          width:30px;
                        }
                    }
                }
            }
        }
        .dots {
            width:100%;
            .pos(a);
            bottom:6px;
            .text-c;
            span {
                .wh-same(6px);
                margin: 0 4px;
                .bg-rgba(144,144,144,.8);
                .d-ib;
                border-radius: 3px;
                &.active {
                    .wh-unlike(15px,6px);
                    background: @color-text;
                }
            }
        }
    }
</style>


