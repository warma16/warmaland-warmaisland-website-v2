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
    download(url,filename){
        const eleLink = document.createElement('a')
        eleLink.download = filename
        eleLink.style.display = 'none'
        eleLink.href = url
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除`
        document.body.removeChild(eleLink)
    }
}
module.exports =new Api()