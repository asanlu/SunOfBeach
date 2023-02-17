<template>
    <view class="start">
        <image class="logo" src="../../static/bg.png" mode="aspectFit"></image>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                
            };
        }
    }
</script>

<style lang="scss">
.start{
    width: 100%;
    height: 100vh;
    background-color: #007fff;
}
.logo{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    width: 100px;
}
</style>
