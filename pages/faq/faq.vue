<template>
    <view>
        <uni-list :border="false">
            <template v-for="(info,index) in list" :key="index">
                <uni-list-item :title="info.title" direction="column" :to="`./faq-detail?id=${info.id}`" clickable>
                    <template v-slot:footer>
                        <view class="content-note content-avatar">
                            <image class="avatar" :src="info.avatar" mode="widthFix"></image>
                            <text class="nickName">{{info.nickname}}</text>
                        </view>
                        <view class="content-note">
                            <text>浏览{{info.viewCount}} - 点赞{{info.thumbUp}} - 回答{{info.answerCount}}
                                {{info.createTime}}</text>
                        </view>
                    </template>
                </uni-list-item>
                <!-- <uni-list-item :border="false" :ellipsis="ellip" :title="info.content" clickable
                    @click="addCommentu(info.id)" /> -->
            </template>

        </uni-list>
    </view>
</template>

<script>
    import {
        getFAQList
    } from "../../models/faq"
    export default {
        data() {
            return {
                list: []
            };
        },
        mounted() {
            getFAQList().then(res => {
                // console.log(res);
                this.list = res.data.list;
                // let html = _this.formatRichText(res.data.content)
                // this.info = {
                //     ...res.data,
                //     content: html
                // };
                // uni.hideLoading();
            });
        },
        onPullDownRefresh() {
            getFAQList().then(res => {
                this.list = res.data.list;
                uni.stopPullDownRefresh();
            });
        }
    }
</script>

<style lang="scss">
    .content-note {
        color: #888;
        font-size: 12px;
    }

    .content-avatar {
        display: flex;
        padding: 4px 0;
        align-items: center;

        .avatar {
            width: 20px;
            height: 20px;
            margin-right: 6px;
        }
    }
</style>
