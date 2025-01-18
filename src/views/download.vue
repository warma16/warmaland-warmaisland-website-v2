<template>
    <div>
        <div class="maintext" style="height:100%">
					<p class="title1">
						沃玛岛PCL客户端
					</p>
					<p class="title2">
						需要<a href="https://www.microsoft.com/en-us/download/details.aspx?id=42642" class="blink" title="下载 .NET Framework 4.5.2">.Net Framework 4.5.2</a>运行环境
					</p>
					<p class="title2">
						需要<b>WINDOWS 7</b>及以上操作系统
					</p>
					<p class="title2">
						需要<a href="https://www.java.com/zh-CN/" class="blink" title="下载最新版JAVA">JAVA8</a>及以上JAVA环境
					</p>
				</div>
				<div class="partd">
					<center>
						<div class="download1">
							<!-- 打开弹窗按钮 -->
							<button id="myBtn" @click="download_hook"><div>下载客户端</div></button>
                            <el-dialog
                            title="下载"
                            :visible="download"
                            width="30%"
                            :before-close="handleClose">
                            <span class="flexcenter">
                                <span v-html="downloadtext"></span>
                                
                                
                            </span>
                            <span v-if="infoshow">还未开始下载？<a @click="downloadd">开始下载</a></span>
                            
                            </el-dialog>
                        </div>
                    </center>
                </div>
    </div>
</template>
<style scoped>
/* CSS Document */
@charset "utf-8";
.body
{
	background-color: rgba(0,0,0,0.3);
	height: 100%;
	margin: 0px 0px -100px 0px;
	padding: 0px 0px 0px 0px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}
.part1
{
	background-color: rgba(256,256,256,0.3);
	height: 500px;
	margin: 200px 00px 50px 00px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}

.maintext
{
	text-align: center;
	padding: 20px 20px 20px 20px;
	
}
.title1
{
	font-weight: bolder;
	font-size: 64px;
	color: #FFFFFF;
	text-shadow: 0px 0px 15px rgba(0,0,0,0.5);
	margin: 0px 0px 0px 0px;
	padding: 50px 0px 0px 0px;
	
}
.title2
{
	color: #FFFFFF;
	text-shadow: 0px 0px 15px rgba(0,0,0,0.5);
}
.blink
{
	font-weight: bolder;
	text-shadow: 0px 0px 18px rgba(0,0,0,0.7);
	transition: .2s;
	color: rgba(255, 153, 170, 1.0) ;
}
.blink:hover
{
	text-shadow: 0px 3px 30px rgba(165, 66, 81, 0.9);
	color: rgba(255, 179, 192, 1.0);
}
.blink:active
{
	text-shadow: 0px 3px 30px rgba(165, 66, 81, 0.9);
	color: rgb(255, 107, 130);
}
.partd
{
	text-align: center;
}
.download
{

	padding: 10px 15px 10px 10px;
	font-size: 30px;
	font-weight: bolder;
	margin: 30px 0px 0px 0px;
	text-align: center;
	text-shadow:0px 2px 15px rgba(0,0,0,0.5) ;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
	background-color: rgb(255, 107, 130);
	border-radius: 50px;
	transition: .2s;
}
.download1
{
	width: 250px;
	
	padding: 0px;
	font-size: 30px;
	font-weight: bolder;
	margin: 0px;

}
.bottext
{
	margin: 5px;
	
}
.download:hover
{
	background-color: rgb(255, 139, 158);
	box-shadow: 0px 4px 25px rgba(165, 66, 81, 0.9);
}

.download:active
{
	background-color: rgb(255, 107, 130);
	box-shadow: 0px 4px 25px rgba(165, 66, 81, 0.9);
}
.flexcenter
{
	display: -webkit-flex; /* Safari */
	display: flex;
	justify-content:center;
	flex-wrap: wrap;
}
.part2
{
	background-color: rgba(256,256,256,0.8);
	margin: 340px 30px 30px 30px;
	height: auto;
	border-radius: 10px 10px 10px 10px;
	max-width: 1400px;
	align: center;
	padding: 30px;
}
.flexbox1
{
	display: -webkit-flex; /* Safari */
	display: flex;
	flex-wrap:nowrap;
}
.about
{
	width: auto;
	height: auto;
	background-color: rgba(256,256,256,1);
	margin: 20px;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}



.boxmini
{
	width: 26%;
	height: auto;
	background-color: rgba(256,256,256,1);
	margin: 20px;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}
.minititle
{
	height: auto;
	background-color:rgb(255, 107, 130) ;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0px 2px 15px rgba(165, 66, 81, 0.9);
	text-align: center;
	padding: 10px;
	font-size: 24px;
	font-weight: bolder;
	color: #FFFFFF;
	text-shadow: 0px 4px 25px rgba(165, 66, 81, 0.9);
}
.pictureabout
{
	width: 100%;
	height: auto;
	border-radius: 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}
.abouttext
{
	height: auto;
	padding: 20px;
	line-height: 27px;
}
.abtit
{
	font-weight: bolder;
	font-size: 24px;
	padding: 10px 10px 10px 10px;
	color: rgb(255, 107, 130);
	text-shadow:  0px 2px 5px rgba(165, 66, 81, 0.3);
}
.abouts
{
	padding: 10px 10px 10px 10px;
}
.blink2
{
	font-weight: bolder;
	text-shadow: 0px 0px 2px rgba(165, 66, 81, 0.3);
	transition: .2s;
	color: rgb(255, 107, 130) ;
}
.blink2:hover
{
	text-shadow: 0px 2px 5px rgba(218, 115, 132, 0.9);
	color: rgb(255, 107, 130);
}
.blink2:active
{
	text-shadow: 0px 3px 30px rgba(165, 66, 81, 0.9);
	color: rgb(255, 107, 130);
}
.mintext
{
	padding: 30px;
	font-size: 14px;
	line-height: 24px;
}
.boxmini2
{
	width: 67.3%;
	height: auto;
	background-color: rgba(256,256,256,1);
	margin: 20px;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}
.boxmini3
{
	width: 46.55%;
	height: auto;
	background-color: rgba(256,256,256,1);
	margin: 20px;
	border-radius: 10px 10px 10px 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
}
.part3
{
	background-color: rgba(256,256,256,0.8);
	margin: 30px 30px 30px 30px;
	height: auto;
	border-radius: 10px 10px 10px 10px;
	max-width: 1360px;
	align: center;
	padding: 50px;
	width: 100%;
}

.player
{
	width: 100%;
	height: 100%;
	border-radius: 0px 0px 10px 10px;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
	
}

.container{
   
    width:100%;
    position:relative;
    display: inline-block;
}
.dummy{
    margin-top: 56.25%;
}
.content{
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
}
.pt3tit
{
	text-align: center;
	background-color: #FFFFFF;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
	padding: 20px;
	font-size: 24px;
	font-weight: bolder;
	border-radius: 10px 10px 0px 0px;
	color: rgb(255, 107, 130);
	text-shadow:  0px 2px 5px rgba(165, 66, 81, 0.3);
}
#myBtn
{
	padding: 10px 15px 10px 10px;
	font-size: 30px;
	font-weight: bold;
	margin: 30px 0px 0px 0px;
	text-align: center;
	text-shadow:0px 2px 15px rgba(0,0,0,0.5) ;
	box-shadow: 0px 2px 15px rgba(0,0,0,0.5);
	background-color: rgb(255, 107, 130);
	border-radius: 50px;
	transition: .2s;
	border: 0px;
	color: #FFFFFF;
	width: 200px;
	font-family: "微软雅黑";
}
#myBtn:hover
{
	background-color: rgb(255, 139, 158);
	box-shadow: 0px 4px 25px rgba(165, 66, 81, 0.9);
}

#myBtn:focus
{
	background-color: rgb(255, 107, 130);
	box-shadow: 0px 4px 25px rgba(165, 66, 81, 0.9);
	outline:none;
}
.dltext
{
	font-size: 24px;
	font-weight: normal;
	padding: 10px;
}
.skinlink
{
	font-weight: bolder;
	color: rgb(255, 107, 130);
	text-shadow: 0px 2px 5px rgba(165, 66, 81, 0.3);
	transition: .2s;
}
.skinlink:hover
{
	color: rgb(255, 139, 158);
	text-shadow: 0px 2px 8px rgba(245, 157, 172, 0.9);
}
.skinlink:focus
{
	color: rgb(255, 107, 130);
	text-shadow: 0px 2px 5px rgba(165, 66, 81, 0.3);
}
</style>
<script>



export default {
    data(){
        return {
            rootclass:"download-pc in-pc",
            addclass:"",
            downloadtext:"<span>正在检查设备环境...</span>",
            infoshow:false,
            download:false,
        }
    },
    methods:{
        downloadd(type){
			return new Promise((resolve,reject)=>{
				if (window._hmt) {
					window._hmt.push(['_trackEvent', 'download',"open"])
					window._hmt.push(['_trackPageview', '/download'])
					switch(type){
						case "pc":
							this.$hardware.download('https://download.warma.ren/uploads%2F2021%2F08%2F26%2FtXyRNnzq_%E3%80%90%E4%B8%8D%E7%9F%A5%E9%81%93%E4%B8%8B%E5%93%AA%E4%B8%AA%E4%B8%8B%E8%BF%99%E4%B8%AA%E3%80%91%E6%B2%83%E7%8E%9B%E5%B2%9B%E6%95%B4%E5%90%88%E5%8C%85fabric21%E5%B9%B48%E6%9C%88.rar')
							break;
						case "mobile":
							this.$hardware.download('https://download.warma.ren/uploads%2F2021%2F08%2F26%2FscLeYHcZ_base.apk')
							break;
						default:
							reject(new Error('Unknown type'))
							return ;

					}
					resolve()
            	//window.open("https://download.warma.ren/uploads%2F2021%2F08%2F26%2FtXyRNnzq_%E3%80%90%E4%B8%8D%E7%9F%A5%E9%81%93%E4%B8%8B%E5%93%AA%E4%B8%AA%E4%B8%8B%E8%BF%99%E4%B8%AA%E3%80%91%E6%B2%83%E7%8E%9B%E5%B2%9B%E6%95%B4%E5%90%88%E5%8C%85fabric21%E5%B9%B48%E6%9C%88.rarr")
				}else{
					reject(new Error("window.hmt is not defined"))
				}
			})
        },
        checkdevice(){

        },
        download_hook(){
			var __this=this
            this.download=true
            if(!this.$hardware.checkphone()){
            this.addclass="pc"
            if(!this.$hardware.ismac()){
                if(this.$hardware.getprocessors()==64){
                    this.downloadtext="<span>正在下载沃玛岛整合包Windows版</span>"
                    if (window._hmt) {
						__this.downloadd("pc").then(()=>{
							setTimeout(()=>{
                        		this.infoshow=true;
                    		},3000)
						})
					}
                    
                }else{
                    this.downloadtext="<span>处理器版本过低，请升级到64位系统</span>"
                }
            }else{
                this.downloadtext="<span>Mac 客户端没有发布，请自行加入服务器</span>"
            }
            
        }else{
            this.rootclass="is-mobile"
            this.downloadtext="<span>正在下载沃玛岛整合包手机版</span>"
			this.downloadd("mobile").then(()=>{
				setTimeout(()=>{
                    this.infoshow=true;
                },3000)
			})
        }
        },
        handleClose(done){
            this.download=false;
            done();
        },
		run(){
			var __this = this
			var elements=document.getElementsByClassName("friendlink")
			elements.forEach((d)=>{
				d.onclick=()=>{
					__this.report(d.href);
				}
			})
			var elements=document.getElementsByClassName("triggerlink")
			elements.forEach((d)=>{
				d.onclick=()=>{
					__this.report(d.href);
				}
			})
			var elements=document.getElementsByClassName("qqgroup")
			elements.forEach((d)=>{
				//console.log(d)
				d.onclick=()=>{
					window.report_suc.report_now("addgroup",'{"fingerprint":'+window.maskdict['fingerprint']+'}')
					__this.$api.addgroupnotify('{"fingerprint":'+window.maskdict['fingerprint']+'}')
				}
			})
		},
		log(d){
			window.report_suc.nativeconsole.log(d)
		},
		report(url){
			window.report_suc.report("gotofriendlinks",String(url))
		},
		qqhandler(){
			window.report_suc.report_now("qqplayer")
			window.maskdict["qqplayer"]=true
		}
    },
    mounted(){
        this.run()
    }
}
</script>