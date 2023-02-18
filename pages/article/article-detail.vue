<template>
    <view class="rich-wrap">
        <uni-list>
            <uni-list-item class="content-list" :border="false" :title="info.nickname" :note="info.position"
                :thumb="info.avatar" thumb-size="lg" :rightText="info.createTime" />
        </uni-list>
        <view class="rich-content">
            <uni-title type="h2" :title="info.title"></uni-title>
            <image style="width:100%" v-if="info.covers" :src="info.covers[0]" mode="widthFix"></image>
            <rich-text class="desc" :nodes="info.content"></rich-text>
        </view>
        <!-- 个人类目不支持webview 
        <web-view :webview-styles="webviewStyles" :src="`https://www.sunofbeach.net/a/1624287020915548162`"></web-view> -->
    </view>
</template>

<script>
    import {
        articleDetail
    } from "../../models/article.js"

    export default {
        data() {
            return {
                id: '',
                info: {},
            };
        },
        onLoad(options) {
            this.id = options.id;
        },
        mounted() {
            const _this = this;
            uni.showLoading({
                title: '加载中'
            });
            articleDetail(this.id).then(res => {
                let html = _this.formatRichText(res.data.content)
                this.info = {
                    ...res.data,
                    content: html
                };
                uni.hideLoading();
            });

        },
        methods: {
            formatRichText(html) {
                //控制小程序中图片大小
                let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
                    console.log(match.search(/style=/gi));
                    if (match.search(/style=/gi) == -1) {
                        match = match.replace(/\<img/gi, '<img style=""');
                    }
                    return match;
                });

                newContent = newContent.replace(/style="/gi, '$& max-width:100% !important; ');
                newContent = newContent.replace(/<br[^>]*\/>/gi, '');
                //过滤pre标签
                newContent = newContent.replace(/<(\/)?pre[^>]*>/gi, '');
                return newContent;
            }
        }
    }
</script>

<style lang="scss">
    .rich-wrap {
        background-color: #fff;
        padding-bottom: 60px;
    }
    .rich-content{
        padding: 0 10px;
    }
    

    .desc {
        img {
            max-width: 100%;
        }
    }
</style>
