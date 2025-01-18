
   
var insertAfter = function(newElement, targetElement){
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
      // 如果最后的节点是目标元素，则直接添加。因为默认是最后
      parent.appendChild(newElement);
  }
  else {
      parent.insertBefore(newElement, targetElement.nextSibling);
      //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
  }
}
import report from "@/api/report.js"

window.report_suc=new report();

const getTimestamp = () => {
  return new Date()
}
/*window.onerror = (message,source,lineno,colon,error) => {
  window.report_suc.report("log","error",{time:getTimestamp(),content:error.stack,message:message,src:source,lineno:lineno})
}
window.addEventListener('error',event => {
  window.report_suc.report("log","error",{time:getTimestamp(),content:event.error.stack,message:event.message,src:event.source,lineno:event.lineno})
})
*/
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
//import axios from "axios"
import restfulapi from "@/api/api.js";
import wxapi from "@/api/wxapi.js";
import hardwareapi from "@/api/hardwareapi.js"
import ElementUI from 'element-ui';
import '@/theme/index.css';
import revealjs from "scrollreveal";
import vconsole from "vconsole";
import captcha from 'vue-social-captcha'



Vue.config.errorHandler = error => {
  window.report_suc.report("log","error",{time:getTimestamp(),content:error.stack})
}

//console.log(restfulapi)
Vue.config.productionTip = false
//Vue.prototype.axios = axios
Vue.prototype.$api=new restfulapi()
Vue.prototype.$wxapi=wxapi
Vue.prototype.bus = new Vue()
Vue.prototype.$hardware=new hardwareapi()
Vue.use(ElementUI);
Vue.use(captcha)
  router.beforeEach((to, from, next) => {
    if (to.path) {
      if (window._hmt) {
        window._hmt.push(['_trackPageview', '/#' + to.fullPath])
      }
    }
   
    next()
  })


   

const app=new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.maskdict=new Proxy({},{
  set(obj,prop,data){
    obj[prop]=data
    window.report_suc.nativeconsole.log(obj)
    app.bus.$emit('maskchange',JSON.stringify(obj))
    return true;
  }
})
var fp=new Fingerprint2();

                   fp.get(function(result){

                       //result即为获取到的浏览器指纹值
                       window.report_suc.nativeconsole.log(result)
                       window.maskdict["fingerprint"]=result
                       window.report_suc.nativeconsole.log(window.maskdict['fingerprint'])
                       window.report_suc.report_now("fingerprint",result)
                    });
                    
app.$hardware.loadjs("//g.alicdn.com/AWSC/AWSC/awsc.js",document.getElementById("app"))
app.$hardware.loadjs("https://ssl.captcha.qq.com/TCaptcha.js",document.getElementById("app"))
