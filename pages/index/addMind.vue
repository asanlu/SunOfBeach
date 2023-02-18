<template>
    <view class="mind">
        <uni-easyinput type="textarea" :inputBorder="false" v-model="textVal" placeholder="分享你此刻的想法..."></uni-easyinput>
    </view>
    <uni-file-picker title="选择图片" v-model="imageValue" fileMediatype="image" :limit="1" mode="grid" @select="select"
        @progress="progress" @success="success" @fail="fail" :image-styles="{width: 100, height: 100}" />
    <view class="mind-gap">
        <text class="mind-text">选择话题</text>
        <uni-data-select :localdata="topicList" label="选择话题" v-model="topicId" :clear="false" />
    </view>
    <view class="mind-gap">
        <button type="primary" @click="commitMind">发布</button>
    </view>
</template>

<script>
    import {
        commentTopic
    } from '@/models/comment';
    export default {
        data() {
            return {
                textVal: '',
                imageValue: [],
                topicList: [],
                topicId: ''
            };
        },
        mounted() {
            const temp = uni.getStorageSync('topic');
            // console.log('uni.getStorageSync()', uni.getStorageSync('topic'))
            this.topicList = temp ? JSON.parse(temp) : [];
            // 无topic缓存，请求数据
            if (!this.topicList.length) {
                commentTopic().then(res => {
                    this.topicList = res.data.map(item => {
                        return {
                            value: item.id,
                            text: item.topicName,
                        }
                    });
                    uni.setStorage({
                        key: 'topic',
                        data: JSON.stringify(this.topicList),
                    });
                });
            }
        },
        methods: {
            commitMind() {

            },
            // 获取上传状态
            select(e) {
                const tempFilePaths = e.tempFilePaths;
                console.log('选择文件：', e)
                uni.uploadFile({
                    url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    // formData: {
                    //     'user': 'test'
                    // },
                    success: (uploadFileRes) => {
                        console.log(uploadFileRes.data);
                    }
                });
            },
            // 获取上传进度
            progress(e) {
                console.log('上传进度：', e)
            },

            // 上传成功
            success(e) {
                console.log('上传成功')
            },

            // 上传失败
            fail(e) {
                console.log('上传失败：', e)
            }
        }
    }
</script>

<style lang="scss">
    .mind {
        border-bottom: 1px solid #ddd;
    }

    .mind-gap {
        margin: 10px 0;
    }

    .mind-text {
        font-size: 14px;
    }
</style>
