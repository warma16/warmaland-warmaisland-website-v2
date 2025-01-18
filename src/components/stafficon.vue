<template>
    <div class="staff_container">
        
        <v-card :class="staff_crd+cardcolor" >
            <v-card-title >
                <v-avatar size="40px" style="z-index:2;">
            <v-img :src="avatar_src" style="z-index:2;"></v-img>
        </v-avatar>
                {{nickname}}
            </v-card-title>
            <v-card-subtitle v-if="playerid!=''">
                ID: {{playerid}}
                <span class="staff_span" v-for="(data,index) in staff_span" :key="index">{{data}}</span>
            </v-card-subtitle>
            <v-card-subtitle v-if="playerid==''">
                <span class="staff_span" v-for="(data,index) in staff_span" :key="index">{{data}}</span>
            </v-card-subtitle>
        </v-card>
    </div>
</template>
<style scoped>
.staff_container{
    background: transparent;
    box-shadow: none; 
    border: none;
    height:87px;
    width:247px;
}
.staff_crd{
    position:absolute;
    top:0px;
    left:78px;
    width: 247px;
    height: 87px;
    opacity: 1;
    
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75); 
}
.staff_span{
    width: fit-content;
    height: 25px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #fb7299;
    border-radius: 5px;
    text-align: center;
    font-size:15px;
    color: #fb7299;

}
.leader{
    background:linear-gradient(0deg,rgba(247,203,107,1.00) 0%, #fba980 100%);
}
.others{
    background: linear-gradient(0deg,#4be6cf 0%, #d4f8ae 100%);
}
.builder{
    background: linear-gradient(0deg,#a1c4fd 0%, #c2e9fb 100%);
}
</style>
<script>
export default {
    props:{
        avatar_src:String,
        nickname:String,
        playerid:String,
        staff_span:Array,

    },
    data(){
        return {
            
            cardcolor:" others",
            isunusual:false
        }
    },
    mounted(){
        var __this = this
        console.log('ok')
        if(this.isunusual==false){
            console.log('ok')
            this.staff_span.forEach(element=>{
                console.log('ok')
                if(__this.isunusual==false){
                    console.log('ok')
                    if(element.indexOf("策划")!=-1 || element.indexOf("服主") != -1){
                        __this.cardcolor=" leader";
                        __this.isunusual=true
                    }else if(element.indexOf("建筑")!=-1 || element.indexOf("服务器") != -1|| element.indexOf("技术") != -1|| element.indexOf("开发") != -1|| element.indexOf("管理") != -1|| element.indexOf("运维") != -1){
                        __this.cardcolor=" builder"
                        __this.isunusual=true
                    }else{
                        __this.cardcolor=" others"
                    }
                }
            })
        }
        
    }
}
</script>