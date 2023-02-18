<template>
    <view class="rich-content">
        <uni-title type="h2" :title="html.title"></uni-title>
        <view>
            <text>问题分类： </text>
            <uni-tag  type="primary" :text="html.categoryName"/>
        </view>
        <view class="content-warp">
        <mp-html :content="html.description" />
        </view>
        <view>
            <uni-icons type="calendar" size="20"></uni-icons>
            <text>发表于{{html.createTime}} </text>
        </view>
        <view>
            <uni-icons type="eye" size="20"></uni-icons>
            <text>浏览{{html.viewCount}}  </text>
            <uni-icons type="hand-up" size="20"></uni-icons>
            <text>点赞{{html.thumbUp}}  </text>
        </view>
    </view>
    <!-- <web-view  :src="`https://www.sunofbeach.net/a/1624287020915548162`">加载中……</web-view> -->
    <!-- :webview-styles="webviewStyles" -->
</template>

<script>
    import {
        getFAQDetail
    } from "../../models/faq"

    export default {
        data() {
            return {
                id: "1624287020915548162",
                html: ''
            }
        },
        onLoad(options) {
            this.id = options.id;
        },
        mounted() {
            getFAQDetail(this.id).then(res => {
                this.html = res.data;
                // let html = _this.formatRichText(res.data.content)
                // this.info = {
                //     ...res.data,
                //     content: html
                // };
                // uni.hideLoading();
            });
        },
        methods: {

        }
    }
</script>

<style>
    .rich-wrap {
        background-color: #fff;
        padding-bottom: 60px;
    }

    .rich-content {
        padding: 0 10px;
    }
    .content-warp{
        padding: 10px 0;
    }
</style>
