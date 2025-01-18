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
class Api{
    checkphone(){
        let flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
    }
    getprocessors(){
        var agent = navigator.userAgent.toLowerCase();

    

    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) { 

        return 32;

    }

    if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
             

        return 64;

    }

         
    }
    ismac(){
        return /macintosh|mac os x/i.test(navigator.userAgent); 
    }
    download(url){
        const eleLink = document.createElement('a')
        eleLink.style.display = 'none'
        eleLink.href = url
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除`
        document.body.removeChild(eleLink)
    }
    loadjs(path,after_dom=null){
        
        
            var hm = document.createElement("script");
            hm.src = path;
            if(after_dom!=null){
                insertAfter(hm,after_dom)
            }else{
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            }
            
    }
    getip(){
        
    }
}
export default Api