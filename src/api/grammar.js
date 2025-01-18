let vm = {
	name: "tom"
}
// vm里边的name实际上可以进行监听


function definedAttribute(vm, key, val,callback) {
    Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: false,
        get(){
            return val
        },
        set(newVal){
            if(val !== newVal){
                val = newVal
                callback(key,val)
            }
        }
    })
}

//window.coreapi={}
window.coreapi.globaldatas={}
window.coreapi.bindelements={}
function getbindelements(){
    console.log('ck')
    var elems = document.body.getElementsByTagName("*");
    console.log(elems)
    console.log(elems[0].classList)
    for(var i=0;i<=elems.length;i++){
        try{
            elems[i].classList.forEach((classs)=>{
                console.log(classs.indexOf('bind-data')!=-1)
                if(classs.indexOf('bind-data')!=-1){
                    console.log('ck')
                    var tmp=classs.split("=")
                    try{
                        tmp[1]=eval(tmp[1])
                    }catch(e){
                        tmp[1]=tmp[1]
                    }
                    console.log('appending')
                    if(window.coreapi.bindelements[tmp[1]]==undefined){
                        window.coreapi.bindelements[tmp[1]]=[]
                    }
                    window.coreapi.bindelements[tmp[1]].push(elems[i])
                }
            })
        }catch(e){
            continue;
        }
    }
    
}
function autoLoad(gb=false){
    if(!gb){
        getbindelements()
        Object.keys(window.coreapi.globaldatas).forEach(key => {
            console.log("al  parse")
            definedAttribute(window.coreapi.globaldatas, key, window.coreapi.globaldatas[key],(el,data)=>{
                window.coreapi.bindelements[el].forEach((dom)=>{
                    if(dom){
                        dom.innerText = String(data)
                    }else{
                        dom.innerText = String("")
                    }
                })
                
            })
        })
    }
    Object.keys(window.coreapi.globaldatas).forEach(el => {
        console.log(window.coreapi.bindelements[el])
        window.coreapi.bindelements[el].forEach(dom=>{
            if(dom){
                dom.innerText = String(window.coreapi.globaldatas[el])
            }else{
                dom.innerText = String("")
            }
        })
        
    })
    
    
}
window.coreapi.putdata=function(key,value){
    window.coreapi.globaldatas[key]=value
    autoLoad();
}
autoLoad()
