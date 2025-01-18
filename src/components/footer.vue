<template>
   <div> 
   <div class="end" id="end">
				<div class="endleft">
					Copyright © 2021 沃玛岛服务器
					<br>
					<a  target="_blank" rel="noopener" href="http://beian.miit.gov.cn/" style="color:#FFFFFF;">沪ICP备2021023050号-8</a>

				</div>
				<div class="endright">
					<a href="https://space.bilibili.com/112978436" class="endlinks friendlink"><i class="fa fa-television" aria-hidden="true" target="_blank"></i> B站</a>
					<a href="https://weibo.com/u/7306093574" class="endlinks friendlink" target="_blank"><i class="fa fa-weibo" aria-hidden="true"></i> 微博</a>
					<a href="https://jq.qq.com/?_wv=1027&k=Y0xoojg3" class="endlinks friendlink qqgroup" target="_blank" group="player"><i class="fa fa-qq" aria-hidden="true"></i> 服务器交流群</a>
					<a href="https://jq.qq.com/?_wv=1027&k=c5xxe3m4" class="endlinks friendlink qqgroup" group="joinus"><i class="fa fa-qq" aria-hidden="true" target="_blank"></i> 加入我们</a>
					<br>
					
					友情链接
					<a href="https://jmcw.vlssu.com/" target="_blank" class="friendlink">Vlssu公益服</a>
					
					<a href="https://skin.vlssu.com/" target="_blank" class="friendlink">Vlssu皮肤站</a>
					<a href="https://bbs.vlssu.com/" target="_blank" class="friendlink">Vlssu论坛</a>
					<a href="https://blog.vlssu.com/" class="friendlink">师叔的小窝</a>
					
					
				</div>
				
				
			
		</div>
		
   </div>
</template>
<style scoped>
.friends{
	position:absolute;
	left:0;
	width:100%;
	height:fit-content;
	bottom:50%
}
.endmiddle {
    float: none;
    color: #FFFFFF;
    width: 300px;
    margin: 40px 20px 20px 40px;
    font-weight: bolder;
}
</style>
<script>
export default {
	
	methods:{
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
		//this.run()
	}
}
</script>