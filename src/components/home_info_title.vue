<template>
    <div :class="'info-title '+type">
        <h1 class="text">
            {{text}}
        </h1>
    </div>
</template>
<style scoped>

    .info-title{
        width: 377px;
height: 73px;
        opacity: 1;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75); 
        text-align: center;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;

    }
    .conf{
        background-color: #13B5B1;
    }
    .warmaisland{
        background-color: #32B16C;
    }
    .alive{
        background-color: #EB6877;
    }
    .build{
        background-color: #F8B551;
    }
    .game{
        background-color: #ec6941;
    }
    .text{
        font-weight: bold;
    }
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data(){
        return {
            style:{
                width: "60px",
                height: "60px",
            }
            
        }
    },
    methods:{
        computer(){
            var documentwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
            var documentheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            if(documentwidth&&documentheight){
                this.style.height=(documentheight*0.0664)+"px"
                this.style.width=(documentwidth*0.1964)+'px'
            }else{
                this.computer()
            }
      
        }
    },
    
    props:{
        type:String,
        text:String,
    }
})
</script>