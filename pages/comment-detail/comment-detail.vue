<template>
    <comment-item class="comment-row" :info="curComment"></comment-item>
    <uni-list>
        <template v-for="(info,index) in commList" :key="index">
            <uni-list-item :border="false" :title="info.nickname" :note="info.position" :thumb="info.avatar"
                :rightText="info.createTime" />
            <uni-list-item :border="false" ellipsis="2" :title="info.content" />
            <uni-list-item :border="false" direction="column">
                <!-- <template v-slot:header>
                    <text>{{info.content}}</text>
                </template> -->
                <template v-slot:body>
                    <view class="reply-wrap" v-if="info.subComments.length">
                        <template v-for="(item, i) in info.subComments" :key="i">
                            <view class="reply-content">
                                <text class="nickname">{{item.nickname}}</text>
                                <text>回复</text>
                                <text class="nickname">{{item.targetUserNickname}}:</text>
                                <text>{{item.content}}</text>
                            </view>
                        </template>
                    </view>
                </template>
            </uni-list-item>
        </template>
    </uni-list>
</template>

<script>
    import {
        commentDetail
    } from "../../models/comment.js"
    // import store from '@/store'

    export default {
        data() {
            return {
                commList: []
            }
        },
        onLoad(options) {
            console.log('inner detail res-->', options);
            let id = options.id || '';
            commentDetail(id).then(res => {
                // console.log('inner page res-->', res.data);
                this.commList = res.data.list;
                // console.log('=====z22  created====',this.commList);
            });
        },
        mounted() {
            // console.log('inner store ', this.$store.state)
            // this.detail = this.$store.state.comment.curComment;
        },
        computed: {
            curComment() {
                return this.$store.state.comment.curComment;
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .comment-row {
        font-size: 14px;
    }

    .reply-wrap {
        padding: 6px;
        background-color: #dadada;
        font-size: 13px;
    }

    .nickname {
        color: #0055ff;
    }

    .reply-content {}
</style>
