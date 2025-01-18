<template>
    <span v-show="hello_show">
        {{hello}}
    </span>
</template>
<script>
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
const randomitem=(data)=>{
    return data[randomNum(0,data.length)]
}
const autohello=()=>{
    var dd= new Date();
    var hour =dd.getHours();//获取当前时
    //alert(hour);
    if(hour>0 && hour<=3){
        return "工作这么晚了,要不要来一份夜宵啊☕";
    }else if(hour>3 && hour<=9){
        return "新的一天就要开始了，加油🙂";
    }else if(hour>9 && hour<=12){
        return "早啊，早饭吃了吗😉";
    }else if(hour>12 && hour<=15){
        return "今天上午过的如何😘";
    }else if(hour>15 && hour<=18){
        return "如果感觉到困意重重可以睡一觉😴";
    }else if(hour>18 && hour<=21){
        return "傍晚好,晚饭吃点啥好呢🤔";
    }else if(hour>21 && hour<=24){
        return "今天过的很不错嘛😘";
    }
}

export default {
    data(){
        return {
            hello:"沃玛岛服务器",
            hello_show:true,
        }
    },
    methods:{
        autohello(){
            var __this = this
            this.hello=autohello();
            this.hello_show=true;
            setTimeout(()=>{
                __this.hello="沃玛岛服务器"
                this.hello_show=true;
            },2000)
        }
    },
    mounted(){
        var __this=this
        setTimeout(()=>{
            __this.autohello()
        },2000)
    }
}
</script>