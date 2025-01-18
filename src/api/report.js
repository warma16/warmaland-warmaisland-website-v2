const tool=require('./tool.js')
class request_item{
    constructor(id=""){
        this.id = '';
        this.name = '';
        this.method = '';
        this.url = '';
        this.status = 0;
        this.statusText = '';
        this.readyState = 0;
        this.header = null; 
        this.requestHeader = null;
        this.startTime = 0;
        this.endTime = 0;
        this.costTime = 0;
        this.getData = null;
        this.postData = null;
        this.actived = false;
        this.id = id;
    }
}
class Api   {
    constructor(){
        this.console=[]
    this.nativeconsole=[]
        //this.nativeconsole=console
        
        this.reqList=[]
        this.mockConsole()
        this.mockAjax()
        //this.mockConsole()
        this.mockError()
    }
    mockConsole() {
        const that = this;
        const methodList = ['log', 'info', 'warn', 'debug', 'error'];
        if (!window.console) {
            window.console = {};
        } else {
            methodList.map(function(method) {
                that.console[method] = window.console[method];
                that.nativeconsole[method] = window.console[method]
            });
            that.nativeconsole.time = window.console.time;
            that.nativeconsole.timeEnd = window.console.timeEnd;
            that.nativeconsole.clear = window.console.clear;
            that.console.time = window.console.time;
            that.console.timeEnd = window.console.timeEnd;
            that.console.clear = window.console.clear;
            
        }

        methodList.map(method => {
            window.console[method] = (...args) => {
                this.report("log",String(method),{
                    logs:args
                });
               
            };
        });

        const timeLog = {}
        window.console.time = function(label) {
            timeLog[label] = Date.now();
        };
        window.console.timeEnd = function(label) {
            var pre = timeLog[label];
            if (pre) {
                console.log(label + ':', (Date.now() - pre) + 'ms');
                delete timeLog[label];
            } else {
                console.log(label + ': 0ms');
            }
        };

        window.console.clear = (...args) => {
            that.clearLog();
            that.console.clear.apply(window.console, args);
        };
    }
    report(type,clas,data=""){
        //this.nativeconsole.log(data)
        if (window._hmt) {
            
              window._hmt.push(['_trackEvent',String(type),String(clas),JSON.stringify(data)])
            
              

        }
    }
    mockError(){
        window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
            window.console.log('errorMessage: ' + errorMessage); // 异常信息
            console.log('scriptURI: ' + scriptURI); // 异常文件路径
            console.log('lineNo: ' + lineNo); // 异常行号
            console.log('columnNo: ' + columnNo); // 异常列号
            console.log('error: ' + error); // 异常堆栈信息
            // ...
            // 异常上报
          };
    }
    mockAjax() {
        let _XMLHttpRequest = window.XMLHttpRequest;
        if (!_XMLHttpRequest) { return; }
        //将this存储起来
        let that = this;
        let _open = window.XMLHttpRequest.prototype.open,
            _send = window.XMLHttpRequest.prototype.send;
        that._open = _open;
        that._send = _send;

        // 模拟XMLHttpRequest的open方法
        window.XMLHttpRequest.prototype.open = function() {
            let XMLReq = this;
            //分割请求的参数
            let args = [].slice.call(arguments),
                method = args[0],
                url = args[1],
                id = that.getUniqueID(); //设置一个值存储当前请求的唯一id，唯一标识
            //定义一个时间计时器
            let timer = null;

            // may be used by other functions
            XMLReq._requestID = id;
            XMLReq._method = method;
            XMLReq._url = url;

            //  模拟XMLHttpRequest的onreadystatechange
            let _onreadystatechange = XMLReq.onreadystatechange || function() {};
            let onreadystatechange = function() {
                let item = that.reqList[id] || {};
                // update status
                item.readyState = XMLReq.readyState;
                item.status = 0;
                if (XMLReq.readyState > 1) {
                    item.status = XMLReq.status;
                }
                item.responseType = XMLReq.responseType;

                if (XMLReq.readyState == 0) {
                    // UNSENT
                    if (!item.startTime) {
                        item.startTime = (+new Date());
                    }
                } else if (XMLReq.readyState == 1) {
                    // OPENED
                    if (!item.startTime) {
                        item.startTime = (+new Date());
                    }
                } else if (XMLReq.readyState == 2) {
                    // HEADERS_RECEIVED
                    item.header = {};
                    let header = XMLReq.getAllResponseHeaders() || '',
                        headerArr = header.split("\n");
                    // extract plain text to key-value format
                    for (let i = 0; i < headerArr.length; i++) {
                        let line = headerArr[i];
                        if (!line) { continue; }
                        let arr = line.split(': ');
                        let key = arr[0],
                            value = arr.slice(1).join(': ');
                        item.header[key] = value;
                    }
                } else if (XMLReq.readyState == 3) {
                    // LOADING
                } else if (XMLReq.readyState == 4) {
                    // DONE
                    clearInterval(timer);
                    item.endTime = +new Date(),
                        item.costTime = item.endTime - (item.startTime || item.endTime);
                    item.response = XMLReq.response;
                } else {
                    clearInterval(timer);
                }

                if (!XMLReq._noVConsole) {
                    that.updateRequest(id, item);
                }
                return _onreadystatechange.apply(XMLReq, arguments);
            };
            //覆盖原始默认的onreadystatechange
            XMLReq.onreadystatechange = onreadystatechange;
            //为了怕请求过程占用第三方应用汇修改xhr默认的方法，所以用了一个定时器循环来监听readyState的变化
            let preState = -1;
            timer = setInterval(function() {
                if (preState != XMLReq.readyState) {
                    preState = XMLReq.readyState;
                    onreadystatechange.call(XMLReq);
                }
            }, 10);

            return _open.apply(XMLReq, args);
        };

        // 默认send方法
        window.XMLHttpRequest.prototype.send = function() {
            let XMLReq = this;
            let args = [].slice.call(arguments),
                data = args[0];
            //重请求池找出相应的请求
            let item = that.reqList[XMLReq._requestID] || {};
            item.method = XMLReq._method.toUpperCase();
            //处理url后面跟着的参数，
            //1,先以？分割为数组
            let query = XMLReq._url.split('?'); // a.php?b=c&d=?e => ['a.php', 'b=c&d=', '?e']
            // 2,在去除最前面的数组
            item.url = query.shift(); // => ['b=c&d=', '?e']
            if (query.length > 0) {
                item.getData = {};
                //3,然后剩下的？又重新连接在一起
                query = query.join('?'); // => 'b=c&d=?e'
                //4,在以& 去键值对
                query = query.split('&'); // => ['b=c', 'd=?e']
                for (let q of query) {
                    q = q.split('=');
                    item.getData[q[0]] = q[1];
                }
            }
            //处理post请求方式，注意这里 会有url接参数，但又是post请求的情况，这里也能处理
            if (item.method == 'POST') {
                // save POST data
                if (tool.isString(data)) {
                    let arr = data.split('&');
                    item.postData = {};
                    for (let q of arr) {
                        q = q.split('=');
                        item.postData[q[0]] = q[1];
                    }
                } else if (tool.isPlainObject(data)) {
                    item.postData = data;
                }

            }

            if (!XMLReq._noVConsole) {
                
                that.updateRequest(XMLReq._requestID, item);
            }

            return _send.apply(XMLReq, args);
        };

    }
    getUniqueID(){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    }
    updateRequest(id, data){
        var preCount = Object.keys(this.reqList).length;
        // update item
        var item = this.reqList[id] || new request_item(id);
        for (var key in data) {
            item[key] = data[key];
        }
        this.reqList[id] = item;
        // console.log(item);
        
        
        if (item.status >= 400) {
            
            this.report("log","error",{
                logType: "network_error",
                logs: {status: item.status,url:item.url,req_header:item.requestHeader,method:item.method,postdata:item.postData,res:item.response,getData:item.getData}
            });
                
  
          
        }else if(item.status>=300&&item.status<400){
            this.report("log","log",{
                logType: "network_redirect",
                logs: {status: item.status,url:item.url,req_header:item.requestHeader,method:item.method,postdata:item.postData,getData:item.getData}
            });
        }else{
            this.report("log","log",{
                logType: "network_ok",
                logs: {status: item.status,url:item.url,req_header:item.requestHeader,method:item.method,postdata:item.postData,getData:item.getData}
            });
        }
        
        
        // update header
        
    }
    report_now(type,clas="",data=""){
        //this.nativeconsole.log(data)
        if (window._hmt) {
            
              window._hmt.push(['_trackPageview',"/report/?type="+String(type)+"&clas="+String(clas)+"&data="+JSON.stringify(data)])
            
              

        }
    }

}

module.exports= Api