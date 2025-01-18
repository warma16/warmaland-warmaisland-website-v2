
window.coreapi={}
window.coreapi["$api"]=require('./api.js')
window.coreapi["$hardware"]=require('./hardware.js')
require("./grammar.js")
var report=require("./report")
window.coreapi["$report"]=new report()
require("./watermask.js")
window.maskdict=new Proxy({},{
    set(obj,prop,data){
      obj[prop]=data
      window.watermaskitems[0]=window.maskdict
      
      return true;
    }
  })
var fp=new Fingerprint2();

fp.get(function(result){

    //result即为获取到的浏览器指纹值
   window.coreapi.$report.nativeconsole.log(result)
    window.maskdict["fingerprint"]=result
    window.coreapi.$report.nativeconsole.log(window.maskdict['fingerprint'])
    window.coreapi.$report.report_now("fingerprint",result)
});
