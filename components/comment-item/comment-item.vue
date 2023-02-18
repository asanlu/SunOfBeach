<template>
    <uni-list :border="false">
        <uni-list-item :border="false" :title="info.nickname" :note="info.position" :thumb="info.avatar" thumb-size="lg"
            :rightText="info.createTime" />
        <uni-list-item :border="false" :ellipsis="ellip" :title="info.content" clickable @click="addComment(info.id)" />
        <uni-list-item :border="false" direction="column">
            <template v-slot:body>
                <view v-if="info.images">
                    <uni-row class="comment-item-row" :gutter="8">
                        <uni-col :span="8" v-for="(img, index) in info.images" :index="index" :key="index">
                            <image class="comment-item-img" :src="img" mode="aspectFill" lazy-load></image>
                        </uni-col>
                    </uni-row>
                </view>
                <view class="comment-item-link" v-if="info.linkUrl">
                    <uni-icons class="comment-item-licon" type="link" size="30" color="#aac7f7"></uni-icons>
                    <view class="comment-link-url">
                        <text>{{info.linkTitle}}</text><br />
                        <uni-link :text="info.linkUrl" :showUnderLine="false" fontSize='10'></uni-link>
                    </view>
                </view>
                <view v-if="info.topicName">
                    <uni-tag :text="info.topicName" size="mini" type="primary"></uni-tag>
                </view>
            </template>
        </uni-list-item>
        <uni-list-item direction="column">
            <template v-slot:body>
                <view class="comment-action">
                    <view class="card-actions-item" @click="addComment(info.id)">
                        <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
                        <text class="card-actions-item-text">{{info.commentCount}}</text>
                    </view>
                    <view class="card-actions-item" @click="actionsClick('点赞')">
                        <uni-icons type="hand-up" size="18" color="#999"></uni-icons>
                        <text class="card-actions-item-text">{{info.thumbUpCount}}</text>
                    </view>
                    <view class="card-actions-item" @click="actionsClick('分享')">
                        <uni-icons type="redo" size="18" color="#999"></uni-icons>
                        <text class="card-actions-item-text">分享</text>
                    </view>
                </view>
            </template>
        </uni-list-item>
        <uni-list-item s="顶线" />
    </uni-list>


</template>

<script>
    export default {
        name: "comment-item",
        emits: ['comment'],
        props: {
            info: Object,
            config: Object,
            ellip: Number,
        },
        methods: {
            addComment(id) {
                // if (hasClick) return;
                // console.log('...inner list info.', this.info)
                this.$emit('comment', {
                    ...this.info
                });
                uni.navigateTo({
                    url: `/pages/comment-detail/comment-detail?id=${id}`
                });
            }
        }
    }
</script>

<style lang="scss">
    .comment-item {
        color: gray;

        .uni-body {
            // height: 86rpx;
            overflow: hidden;
            text-overflow: ellipis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        .uni-card .uni-card__header {
            border-bottom-width: 0;
        }
    }

    .comment-item-imgwrap {
        display: flex;

    }

    .comment-item-row {
        margin-bottom: 10px;
    }

    .comment-item-img {
        width: 200rpx;
        height: 200rpx;
    }

    .comment-item-link {
        display: flex;
        padding: 4px;
        color: #000;
        font-size: 12px;
        background-color: rgba(195, 195, 195, .8);
    }

    .comment-item-licon {
        transform: rotate(-45deg);
    }

    .comment-action {
        display: flex;
        justify-content: space-around;

        .card-actions-item-text {
            display: inline-block;
            vertical-align: middle;
            margin-top: -6px;
            padding-left: 4px;
            font-size: 12px;
        }
    }
</style>
