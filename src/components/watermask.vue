<template>
  <div class="waterMask">
    <div class="item">
{{maskdata}}
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
        maskdata:""
    };
  },
 mounted() {
     this.bus.$on('maskchange',(data)=>{
         this.maskdata=data
     })
 }
};
</script>

<style scoped>
.waterMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999999999; 
  pointer-events: none; 
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: transparent; 
  
}
.waterMask .item {
    font-size: 20px;
    padding: 10px;
    color: rgba(255, 255, 255, 0.03); 
  }
</style>