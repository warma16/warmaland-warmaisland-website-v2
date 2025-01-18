<template>
    
        <v-card style="width:100%;height: 8.3%;" @click="clickhandler">
            <v-img :src="bilivideodata.pic" style="width: 26.1%;"></v-img>
            <v-card style="position:absolute;left:26.1%;top:0px;height:100%;width:73.9%;">
                <v-card-text>{{bilivideodata.title}}</v-card-text>
            </v-card>
        </v-card>
</template>
<script>
import axios from "axios"
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
                time:"1970-01-01 00:00:00",
                pic:"",

            },
            staff_show:false,
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
                __this.bilivideodata.title=res.data.data.title
                
                __this.bilivideodata.pic=res.data.data.pic
                console.log(res.data.data.pic)
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
            if((date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)<10){
                M="0"+M
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
        clickhandler(){
            var __this=this
            this.bus.$emit('changevideo',__this.bvid)
        }
    },
    mounted(){
        this.getinfo(this.bvid)
    },
    props:{
        bvid:String,
    }
}
</script>