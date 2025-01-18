<template>
    <div class="error" v-loading="true" :element-loading-text="text"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <i class="error-img"></i>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                show:true,
                text:"正在加载文案",
                console:window.report_suc.nativeconsole
            }
        },
        methods:{
            parse(timeout,text,callbackurl){
                if(text==false){
                    this.text=timeout+"秒后,会跳转到相应地址请稍后"
                }else{
                    this.text=timeout+text
                }
                this.redirect(Number(timeout),callbackurl)
            },
            param(variable){
                var query = window.location.hash.substring(1).split('?')[1]
                
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                        var pair = vars[i].split("=");
                        
                        if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
            redirect(timeout,url){
                this.console.log(url)
                setTimeout(()=>{
                    window.location.href=url
                },timeout*1000+1000)
            }
        },
        mounted(){
            var __this=this
            this.parse(__this.param('timeout'),__this.param('text'),__this.param('redirect_url'))
        }
    }
</script>
<style scoped>
.error {
    position:fixed;
    left:0;
    top:0;
    width: 100%;
    height:100%;
}
</style>