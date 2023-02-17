<template>
    <template v-for="(item,index) in commList" :key="index">
        <comment-item class="comment-row" :info="item" @comment="saveCurComment"></comment-item>
    </template>
</template>

<script>
    import {
        commentList
    } from "../../models/comment.js"
    import store from '@/store'
    export default {
        data() {
            return {
                commList: []
            }
        },
        mounted() {
            // console.log('store',this.$store.state)
            commentList().then(res => {
                // console.log('inner page res-->', res.data);
                this.commList = res.data.list;
                // console.log('=====z22  created====',this.commList);
            });
        },
        methods: {
            saveCurComment(e) {
                // console.log('log event data', e);
                store.commit('updateCurComment', e)
            }
        },
        onPullDownRefresh() {
            commentList().then(res => {
                this.commList = res.data.list;
                uni.stopPullDownRefresh();
            });
        }
    }
</script>

<style>
    .comment-row {
        /* display: block;
        margin-bottom: 10px; */
        /* border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #ddd; */
    }
</style>
