var watermask=document.createElement("div")
watermask.id="waterMask"
const str=(s)=>{
    if(typeof(s)=="object"){
        return JSON.stringify(s)
    }else if(typeof(s)=="string"){
        return s
    }else{
        return String(s)
    }
}
window.watermaskitems=new Proxy([],{
    set(obj,index,value) {
        console.log('append')
        obj[index]=value;
        var water= document.createElement("div")
        water.innerText=str(value)
        water.className="item"
        var s = document.getElementById("waterMask")
        s.appendChild(water, s);
        return true;
    }
})
var style=document.createElement("style")
style.innerHTML="#waterMask {position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999999999999; pointer-events: none; display: flex;flex-wrap: wrap;justify-content: center;background: transparent; }#waterMask .item{font-size: 20px;padding: 10px;color: rgba(255, 255, 255, 0.03); }"
var s = document.getElementsByTagName("style")[0]; 
s.parentNode.insertBefore(style, s);
var s = document.getElementsByTagName("div")[0]
s.parentNode.insertBefore(watermask, s);