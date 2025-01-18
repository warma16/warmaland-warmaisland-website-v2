<template>
    <v-card style="position: absolute;left:0px;top:0px;width:100%;height:100%">
        <v-card style="width:76.1%;position:absolute;left:0px;top:0px;height:100%">
            <v-card-title @click="titleclickhandler">{{bilivideodata.title}}</v-card-title>
            <v-card-subtitle>{{bilivideodata.view}}播放·{{bilivideodata.danmaku}}弹幕 {{bilivideodata.time}}</v-card-subtitle>
            <v-card-text>
                <iframe id="biframe" :src="bilivideodata.iframe" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute;width:98%;height:80%"> </iframe>
                
            </v-card-text>
            
        </v-card>
        <v-card style="position: absolute;right:0%;top:0px;width:23.9%;height:25.6%;">
                <v-card-title>
                    创作团队 ({{bilivideodata.staff.num}})
                    
                </v-card-title>
                
                    <v-slide-group >
                        <v-slide-item v-for="(data,index) in bilivideodata.staff.data" :key="index">
                            <div class="up-card" >
                                <div class="avatar">
                                    <el-avatar   :src="data.face">
                                        
                                    </el-avatar>
                                    <span class="info-tag">{{data.title}}</span>
                                    
                                    
                                </div>
                                <div class="avatar-name__container">
                                    <a class="name-text" :href="'//space.bilibili.com/'+data.mid">
                                        {{data.name}}
                                    </a>
                                </div>
                            </div>
                        </v-slide-item>
                    </v-slide-group>

            </v-card>
        <v-card style="position: absolute;right:0%;top:26.688%;width: 23.9%;height:71.67%;overflow:auto;overflow-x:hidden;" >
            <v-card-title style="font-size: 24px;">
                更多视频
                    
            </v-card-title>
            <div v-for="(data,index) in bvidlist" :key="index" >
                <videoinfo  :bvid="data" ></videoinfo>
                <v-divider></v-divider>
            </div>

        </v-card>
    </v-card>
</template>
<style scoped>
.avatar .info-tag{
    position: absolute;
    background: #fff;
    border: 1px solid #fb7299;
    border-radius: 2px;
    display: inline-block;
    font-size: 12px;
    color: #fb7299;
    padding: 0 3px;
    top: -10px;
    right: -10px;
    white-space: nowrap;
    border-radius: 5px;
}
.avatar{
    background-color: #f4f5f7;
    position: relative;
}

.up-card{
    width: 60px;
    height: 72px;
    display: -ms-flexbox;
    display: flex;
    diaplay:-webkit-flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    margin: 5px 5px 20px 0;
}
.up-card .avatar-name__container{
    width: 60px;
    height: 30px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: start;
    align-items: flex-start;
}
.up-card .avatar-name__container .name-text {
    font-family: PingFangSC-Regular,sans-serif;
    line-height: 15px;
    color: #222;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
<script>
import axios from "axios"
import videoinfo from "@/components/bilipreload.vue"
export default {
    data(){
        return {
            axios:axios,
            bilivideodata:{
                
                iframe:"//player.bilibili.com/player.html",
                danmaku:"1024",
                view:"999",
                title:"正在加载中...",
                staff:{
                    num:20,
                    data:[],
                },
                time:"1970-01-01 00:00:00"

            },
            staff_show:false,
            bvidlist:["BV12K4y1h7Vm","BV13q4y1D7p5","BV1Z54y1a7j7","BV18f4y1z7w5","BV16X4y1574J","BV15o4y1f7mL","BV1NV411Y73M","BV1sr4y1F7cn","BV1454y1r7bC","BV12K4y1h7Vm","BV1m7411p7g2","BV1Y7411p7Ff","BV1AK411P7PF"],
            bvidlisttmp:[],
            player_style:{
                width:"0px",
                height:"0px",
            }
        }
    },
    methods:{
        process(num){
            if(num>=10000&&num<100000000){
                return String((num/10000).toFixed(1))+"万"
            }
            if(num>=100000000){
                return String((num/100000000).toFixed(1))+"亿"
            }
            return String(num)
        },
        getinfo(bvid){
            var __this=this
            this.$api.getbilibilivideoinfo(bvid).then((res)=>{
                __this.bilivideodata.time=__this.ctimeparser(res.data.data.pubdate)
                __this.bilivideodata.danmaku=res.data.data.stat.danmaku
                __this.bilivideodata.view=res.data.data.stat.view
                __this.bilivideodata.iframe=__this.gnplayerurl(res.data.data.aid,res.data.data.bvid,res.data.data.cid)
                var e=document.createEvent("MouseEvents")
        e.initMouseEvent('click',true,true)
        document.getElementById('biframe').dispatchEvent(e)
                __this.bilivideodata.title=res.data.data.title
                if(res.data.data.staff!=undefined){
                    __this.bilivideodata.staff.num=res.data.data.staff.length
                    __this.bilivideodata.staff.data=res.data.data.staff
                }else{
                    __this.bilivideodata.staff.num=1
                    __this.bilivideodata.staff.data=[res.data.data.owner]
                }
                console.log(__this.bilivideodata.staff.num)
            })
        },
        gnplayerurl(aid,bvid,cid,page=1){
            return '//player.bilibili.com/player.html?aid='+aid+"&bvid="+bvid+"&cid="+cid+"&page="+page
        },
        titleclickhandler(){
            window.open("https://www.bilibili.com/video/"+this.bvid)
        },
        ctimeparser(timestamp){
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            if(date.getDate()<10){
                D="0"+D
            }
            
            if(date.getHours()<10){
                h="0"+h
            }
            if(date.getMinutes()<10){
                m="0"+m
            }
            if(date.getSeconds()<10){
                s="0"+s
            }
            return Y + M + D + h + m + s;
	
        },
        gotomid(mid){
            this.jumplink('//space.bilibili.com/'+String(mid))
        },
        jumplink(link){
            window.open(link)
        },
        fitwidth(){
            var documentwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            var documentheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            if(documentwidth&&documentheight){
                this.player_style.height=((1002/1100)*documentheight)+"px"
                this.player_style.width=((0.538)*documentwidth)+"px"
            }else{
                this.fitwidth()
            }
        }
    },
    mounted(){
        this.getinfo('BV12K4y1h7Vm')
        
    },
    created(){
        var  __this = this
        
        this.bus.$on("changevideo",(e)=>{
            __this.getinfo(e)
        })
        var documentwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            var documentheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            if(documentwidth&&documentheight){
                this.player_style.height=(((1002+256)/1920)*documentheight)+"px"
                this.player_style.width=((0.530)*documentwidth)+"px"
            }else{
                this.fitwidth()
            }
    },
    components:{
        videoinfo
    }
}
</script>