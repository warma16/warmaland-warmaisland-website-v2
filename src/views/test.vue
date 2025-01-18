<template>
    <div class="test">
			
			<test ></test>
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
.el-drawer{
    /* overflow-x: auto; */
    background-color:rgba(0, 0, 0, 0.65);
}
.el-drawer__title{
    /* overflow-x: auto; */
    background-color:rgba(0, 0, 0, 0.65);
}
</style>
<script>
import test from "@/components/staff_show.vue";
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
        cb(data){
            console.log(data[0])
        }
    },
    mounted(){
        this.$api.blacklist().catch((err)=>{
            console.log(err)
        })
    },
    components:{
        test
    }

}
</script>