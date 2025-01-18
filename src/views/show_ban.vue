<template>
    <v-card style="background-color:transparent;box-shadow:none;">
        <div :class="changecolor(data['endtime'])" v-for="(data,index) in blacklist" :key="index">
            <v-card>
                <v-card-title>{{data["nickname"]}}</v-card-title>
                <v-card-subtitle>
                    执行者：
                    <span v-if="data['exector']!='all'">
                        {{data['exector']}}
                    </span>
                    <span v-if="data['exector']=='all'">
                        服务器组全体成员
                    </span>
                    <br />
                    <span>{{checkok(data["endtime"])}}</span>

                </v-card-subtitle>
                <v-card-text>原因：{{data["reason"]}}</v-card-text>
                
            </v-card>
        </div>
    </v-card>
</template>
<style scoped>
.true{
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 20px solid rgb(47, 87, 207);
    margin: 20px 0;
    box-shadow:0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
.false{
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 20px solid #FF6B3A;
    margin: 20px 0;
    box-shadow:0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}

</style>
<script>
export default {
    data(){
        return {
            blacklist:[]
        }
    },
    created(){
        var __this = this
        this.$api.blacklist((res)=>{
            if(eval(res.data.code)==0){
                __this.blacklist=res.data.data
                //console.log(__this.blacklist)
            }else{
                throw new Error("Network Error")
            }
        })
        //console.log(String((new Date()).valueOf()==false))
    },
    methods:{
        changecolor(time){
            console.log(time)
            if(time){
                if((new Date()).valueOf()>=time){
                    return "true"
                }else if(time==true){
                    return "true"
                }else{
                    return "false"
                }
            }else{
                return "false"
            }
        },
        checkok(time){
            console.log(time)
            if(time){
                if((new Date()).valueOf()>=time){
                    return "已解封"
                }else if(time==true){
                    return "已解封"
                }else{
                    return "正在封禁"
                }
            }else{
                return "正在封禁"
            }
        }
    },
}
</script>