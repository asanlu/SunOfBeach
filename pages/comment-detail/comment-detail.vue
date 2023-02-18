<template>
    <page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
    <view style="padding-bottom: 60px;">
        <comment-item class="comment-row" :info="curComment"></comment-item>
        <uni-list>
            <template v-for="(info,index) in commList" :key="index">
                <uni-list-item :border="false" :title="info.nickname" :note="info.position" :thumb="info.avatar"
                    :rightText="info.createTime" />
                <uni-list-item :border="false" ellipsis="2" :title="info.content" @click="replyComm(info)" clickable />
                <uni-list-item :border="false" direction="column">
                    <!-- <template v-slot:header>
                    <text>{{info.content}}</text>
                </template> -->
                    <template v-slot:body>
                        <view class="reply-wrap" v-if="info.subComments.length">
                            <template v-for="(item, i) in info.subComments" :key="i">
                                <view class="reply-content" @click="replyComm(item)">
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

    </view>
    <uni-popup ref="popup" type="bottom">
        <view class="reply-edit" :style="{bottom: inputOffsetBottom > 0 ? inputOffsetBottom + 'px' : '0'}">
            <uni-easyinput type="textarea" :adjust-position="false" autoHeight :inputBorder="false" v-model="reply"
                :placeholder="placeholder" :focus="!!placeholder" @focus="inputOffsetPx" @blur=""></uni-easyinput>
            <text class="ghost-btn" @click="submit('dynamicForm')">发送</text>
        </view>
    </uni-popup>
    <!-- <uni-popup ref="popup" type="center" @change="change">
        <uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
        <uni-popup-dialog ref="inputClose" mode="input" title="评论" :value="replyVal" :placeholder="placeholder"
            @confirm="dialogInputConfirm"></uni-popup-dialog>
    </uni-popup> -->
</template>

<script>
    import {
        commentDetail
    } from "../../models/comment.js"
    // import store from '@/store'

    export default {
        data() {
            return {
                commList: [],
                commContent: {},
                replyVal: '',
                placeholder: '',
                show: false,
                inputOffset: 0
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
            replyComm(item) {
                this.$refs.popup.open('bottom')
                this.placeholder = `回复：${item.nickname}`
                console.log('click item', item.nickname, item.id)
            },
            dialogInputConfirm(val) {
                // uni.showLoading({
                //     title: '3秒后会关闭'
                // })
                // uni.hideLoading()
                console.log(val)
                this.replyVal = val
                // this.$refs.inputDialog.close()
            },
            inputOffsetPx(e) {
                if (this.inputOffset) return;
                this.inputOffset = e.detail.height;
            },
            blurOffsetPx(e) {
                this.inputOffset = 0;
            }
        }
    }
</script>

<style lang="scss">
    .comment-row {
        font-size: 14px;
    }

    .reply-wrap {
        padding: 6px;
        background-color: #efefef;
        font-size: 13px;
        border-radius: 5px;
    }

    .nickname {
        color: #03A9F4;
    }

    .reply-content {}

    .reply-edit {
        position: fixed;
        display: flex;
        width: 100%;
        left: 0;
        bottom: 0;
        padding-bottom: 6px;
        background-color: #fff;
    }

    .ghost-btn {
        line-height: 16px;
        font-size: 14px;
        height: 16px;
        font-weight: 200;
        padding: 4px 7px;
        border-width: 1rpx;
        border-style: solid;
        border-color: #8f939c;
        color: #2979ff;
        border-color: #2979ff;
        background-color: #fff;
    }
</style>
