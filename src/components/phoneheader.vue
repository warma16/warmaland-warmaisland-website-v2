<template>
    <div class="top">
			<div class="topline1">
                
				<div class="logo" >
                    <i class="iconfont icon-menu" @click="open"></i>
                    
                </div>
				<div class="lefttop">
					<div class="title">沃玛岛服务器</div>
					
				</div>
			</div>
            <el-drawer direction="ltr" :visible="!fold" :modal-append-to-body="false" :before-close="handleClose" size="40%"  custom-class="drawer" style="background-color:rgba(0, 0, 0, 0.65)">
                <div class="links">
						<div class="navigation">
                            <el-container direction="vertical">
                                <router-link to="/"><a  class="navlink" style="color:#ffff;">首页</a></router-link>
                                <a href="https://skin.warma.ren" class="navlink friendlink" style="color:#ffff;" target="_blank">皮肤站</a>
                                <router-link to="/download"><a  class="navlink" style="color:#ffff;">客户端下载</a></router-link>
                                <router-link to="/maps"><a  class="navlink" style="color:#ffff;">地图</a></router-link>
                                <a href="#" class="navlink" style="color:#ffff;">帮助</a>
                                <a href="#end" class="navlink" style="color:#ffff;">联系</a>
                                <a href="#" class="navlink" style="color:#ffff;">staff</a>
                                
                            </el-container>
						</div>
					</div>
            </el-drawer>
			
		</div>
</template>
<style scoped>
.lefttop {
    position: absolute;
    left:20%;
    top:0%;
    height: 100%;
    width: 60%;
    display:flex;
    justify-content:center;
    align-items:center;
}
.right ::before{
    transform:translateX(5px) translateY(-4px) rotate(45deg) scaleX(.5);
}
.right ::after{
    transform:translateX(5px) translateY(4px) rotate(-45deg) scaleX(.5);
  }
.right{
    width:100px;
    height:100px;
}
.logo{
    color:#ffffff;
    position:absolute;
    left:0;
    top:0;
    width:20%;
    height:100%;
}
.navigation{
    color:#ffffff;
    display:flex;
    align-items:center;
}
.navigation a{
    color:#ffffff;
    
}
.title{
    font-size: 32px;
	font-weight: bold;
    color:#ffffff;
}
.drawer{
    background:rgba(0, 0, 0, 0.65);
}
</style>
<style >
.el-drawer__body {
    overflow: auto;
    /* overflow-x: auto; */
    background-color:rgba(0, 0, 0, 0.65);
}
.el-drawer__header {
    /* overflow-x: auto; */
    background-color:rgba(0, 0, 0, 0.65);
}
.el-drawer {
    /* overflow-x: auto; */
    background-color:rgba(0, 0, 0, 0.65);
}
</style>
<script>
export default {
    data(){
        return {
            fold:true,
        }
    },
    methods:{
        open(){
            this.fold=!this.fold;
        
        },
        handleClose(done){
            this.open();
            done();

        },
        handleSelect(key){
            this.open();
        },
    }
}
</script>