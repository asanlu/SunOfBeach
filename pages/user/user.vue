<template>
    <view>
        <uni-list>
            <uni-list-item :border="false" title="info.title" note="info.position" thumbSize="lg" thumb="https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0" />
            <uni-list-item :border="false" ellipsis="2" title="info.content" />
            <uni-list-item :border="false" title="info.content" >
                <template v-slot:header>
                    <view>
                        <button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">1212
                        </button> 
                    </view>
                </template>
            </uni-list-item>
        </uni-list>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        },
        // 右上角菜单才会显示“转发”按钮
        onShareAppMessage(from, target, webViewUrl){
            
            return {
                  title: '我定义的转发标题',
                  path: '/page/user?id=123',
                  // promise 
                }
        },
        // 分享到朋友圈
        onShareTimeline(){
            
        },
        methods:{
            login(){
                
            }
        }
    }
</script>

<style lang="scss">

</style>
