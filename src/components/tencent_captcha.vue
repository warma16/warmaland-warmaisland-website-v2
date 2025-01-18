<template>
    <div class="tencent-captcha">
        <button id="TencentCaptcha"
   data-appid="2026950813"
   data-cbfn="tencent_captcha_callback"
   type="button"
   class="ant-btn ant-btn-primary ant-btn-block"
>验证</button>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
    },
    created(){
        window.tencent_captcha_callback=(res)=>{
            this.$emit("success",res)
        }
    }
}
</script>
<style>
#tcaptcha_transform_drag{
    position:fixed;
}
</style>
