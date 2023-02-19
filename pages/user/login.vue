<template>
    <view class="login-wrap">
        <uni-title type="h1" title="欢迎来到阳光沙滩"></uni-title>
        <uni-forms ref="form" :rules="rules" :model="formData">
            <uni-forms-item label="" name="phoneNum">
                <uni-easyinput v-model="formData.phoneNum" type="number" placeholder="请输入手机" />
            </uni-forms-item>
            <uni-forms-item label="" name="password">
                <uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
            </uni-forms-item>
            <view class="captcha-wrap">
                <uni-forms-item label="" name="captcha">
                    <uni-easyinput v-model="formData.captcha" placeholder="请输入验证码" />
                </uni-forms-item>
                <image class="captcha" :src="captchaURL" mode="widthFix" @click="getCaptchaURL"></image>
            </view>
        </uni-forms>
        <button @click="submitForm">登 录</button>
        <view class="">
            <uni-link href="https://uniapp.dcloud.io/" text="注册账号" :showUnderLine="false" color="#007fff"></uni-link>
            <uni-link href="https://uniapp.dcloud.io/" text="忘记密码" :showUnderLine="false" color="#007fff"></uni-link>
        </view>
    </view>
</template>

<script>
    import {hexMD5 as md5} from '@/utssdk/md5.js'   
    // const md5 = require('../../utssdk/md5.min.js');
    // const md5 = require('../../utssdk/md5.js');
    
    import {
        getCaptcha,
        login
    } from "../../models/login";
    export default {
        data() {
            return {
                rules: {
                    phoneNum: {
                        rules: [{
                                pattern: '^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$',
                                errorMessage: '请填写正确手机号',
                            },
                            {
                                maxLength: 11,
                                errorMessage: '手机长度不对',
                            }, {
                                required: true,
                                errorMessage: '请填写手机',
                            }
                        ],
                        validateTrigger: 'submit'
                    },
                    captcha: {
                        rules: [{
                            required: true,
                            errorMessage: '请填写验证码',
                        }]
                    }
                },
                formData: {
                    phoneNum: '',
                    password: '',
                    captcha: ''
                },
            }
        },
        onLoad(){
            
        },
        mounted() {
            this.getCaptchaURL();
        },
        methods: {
            getCaptchaURL() {
                // console.log(md5('123456qwert'));
                this.$store.dispatch('login/getCapCode');
                // getCaptcha().then(res => {
                //     console.log("pages inner ", res)
                //     // const arrayBuffer = new Uint8Array(res.data)
                //     // const base64URL = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer)
                //     // const base64 = window.btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                //     this.captchaURL = res;
                // })
            },
            submitForm(form) {
                const l_c_i = this.$store.state.login.l_c_i
                console.log(l_c_i);
                this.$refs.form.validate().then(form => {
                    console.log('表单数据信息：', form);
                    login({
                        l_c_i,
                        ...form,
                        password: md5(form.password)
                    }).then(res => {
                        console.log('request', res)
                        uni.showToast({
                            icon: 'none',
                            title: res.message
                        });
                        this.getCaptchaURL();
                        if(res.code === 10000){
                            uni.navigateTo({
                                url: 'user',
                            });
                        }
                    });
                }).catch(err => {
                    console.log('表单错误信息：', err);
                })
            },
        },
        computed: {
            captchaURL() {
                return this.$store.state.login.captchaURL;
            }
        },
    }
</script>

<style lang="scss">
    .login-wrap {
        padding: 10px;
    }

    .captcha-wrap {
        display: flex;

        .uni-forms-item {
            flex: 1;
        }

        // justify-content: space-between;
        .captcha {
            margin-left: 10px;
            width: 100px
        }
    }
</style>
