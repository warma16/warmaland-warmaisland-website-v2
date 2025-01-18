<template>
  <el-container id="app" style="position:absolute;left:0;top:0;width:100%;">
    <el-header>
		<headerpc v-if="!isphone"></headerpc>
		<headerphone v-if="isphone"></headerphone>
    </el-header>
    
    <el-main class="body">
      <router-view />
    </el-main>
    <el-footer>
      <footers></footers>
    </el-footer>
	<top></top>
  <WaterMask />
  </el-container>
</template>

<script>
import headerpc from "@/components/head.vue";
import footers from "@/components/footer.vue";
import top from "@/components/totop.vue";
import headerphone from "@/components/phoneheader.vue";
import WaterMask from '@/components/watermask';
export default {
  components:{
    headerpc,
    footers,
	top,
	headerphone,
  WaterMask
  },
  data(){
	  return {
		  isphone:false,
	  }
  },
  created(){
	  this.isphone=this.$hardware.checkphone()
  }
}
</script>
<style scoped>
#app{
	font-family: "webfont";
}
</style>