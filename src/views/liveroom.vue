<template>
  <v-card class="flv_box">
  <video id="myvideo" controls  autoplay muted></video>
  <v-snackbar
      v-model="snackbar"
    >
      当前主播已下播

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import flv from 'flv.js';
export default {
    name:'flv',
  components:{},
   data(){return{
    player : null,
    playing: false,
    url:"https://live.warma.ren/cxchency/l2d.flv",
    reconnecting: false,
    snackbar: false,
    timer:[],
  }},
  
  mounted()
  {
      var __this=this
    this.createPlayer(__this.url)
    
    
  },
  methods:{
    onClick(){
      console.log('播放')
        this.player.play()
        this.playing = true;
    },
    clickStop(){
        console.log('暂停')
        this.player.pause()
        this.playing = false;
    },
    createPlayer(url){
        var __this = this
        if(flv.isSupported()){
            if (this.player) {
                this.player.pause();
                this.player.unload();
                this.player.detachMediaElement();
                this.player.destroy();
            }
            this.player=null;
            this.player = flv.createPlayer({
            // type: 'flv',
            type: "flv",
            url:url,
            isLive: true,   
            });
            this.player.on('error', err => {
                console.log('err', err);
            });
            this.player.on("statistics_info", (res)=> {
                if (this.lastDecodedFrame == 0) {
                    this.lastDecodedFrame = res.decodedFrames;
                    return;
                }
                if (this.lastDecodedFrame != res.decodedFrames) {
                    this.lastDecodedFrame = res.decodedFrames;
                } 
                else{
                    this.lastDecodedFrame = 0;
                    __this.reconnecting+=1
                    if(__this.reconnecting<=10){
                        __this.createPlayer(__this.url)
                    }else{
                        __this.snackbar=true;
                        setTimeout(()=>{
                            __this.snackbar=false;
                        },5000)
                    }
                    
                }
            })
            this.player.on(flv.Events.ERROR,()=>{
                __this.createPlayer(__this.url)
            })
            var video = document.querySelector('#myvideo')
            this.player.attachMediaElement(video)
            this.player.load()
            this.player.play()
            this.playing= true
            this.timer.push(setInterval(() => {
                if (this.player.buffered.length) {
                    let end = this.player.buffered.end(0);//获取当前buffered值
                    let diff = end - this.player.currentTime;//获取buffered与currentTime的差值
                    if (diff >= 8) {//如果差值大于等于0.5 手动跳帧 这里可根据自身需求来定
                        this.player.currentTime = this.player.buffered.end(0);//手动跳帧
                    }
                }
            }, 2000))
        }else{
            throw new Error("The Browser didn't support the flv.js")
        }
    },
    timerdes(){
        this.timer.forEach(interval=>{
            clearInterval(interval);
            interval=null;
        })
    },
    
  },
  beforeDestroy(){
      this.flvPlayer.destroy()
      this.timerdes()
  }
}
</script>
<style lang="scss" scoped>
.flv_box{
    width: 100%;
    height: 100vh;
    #myvideo{
        position:fixed;
        left: 0;
        top: 0;
      width: 100%;
      height: 100%;
    }
}
</style>
