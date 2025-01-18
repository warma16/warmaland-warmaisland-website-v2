//const mcapi= require('./mcapi');
//const coder= require('./coder');
var express = require('express');
//var http = require('http');
//var WebSocket = require('ws');
const axios = require('axios')


var app = express();
app.use(express.static(__dirname));

/*var server = http.createServer(app);
var wss = new WebSocket.Server({server});
var senddatalist=[]
var senddataclientpath=['/sendstatus']
const clientboardcast=(clientlist,data)=>{
    clientlist.forEach(client=>{
        if(senddatalist.indexOf(client)==-1){
            client.send(data)
        }
    })
}*/
//var clientrechache=null;
/*wss.on('connection', (ws,req)=>{
    console.log('链接成功！');
    if(senddataclientpath.indexOf(req.url.match('/').input)!=-1){
        senddatalist.push(ws)
    }
    ws.on('message', (data)=>{
        if(req.url.match('/').input=="/sendstatus"){ 
            if(data != 'heartbeat'){
                if(clientrechache==null){
                    ws.send(JSON.stringify(J))
                }
                    var datac={}
                    coder.encode(data).then((cdata)=>{
                        datac['mcstatus']=cdata
                        clientboardcast(wss.clients,JSON.stringify(datac))
                        ws.send(JSON.stringify({refresh_timestamp:(new Date()).valueOf()+5000}))
                    })
            }else{
                ws.send('alive')
            }
        }
        
        //console.log(data)
        
    });
    
    setInterval(()=>{
        var datac={}
        mcapi.mcapi().then((data)=>{
            //console.log(data)
            
                coder.encode(data).then((cdata)=>{
                    datac['mcstatus']=cdata
                    clientboardcast(wss.clients,JSON.stringify(datac))
                })
            
        })
        
    },1999)

})*/
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });
app.get('/getbilibilivideoinfo',(req,res)=>{
    axios({
        method: 'GET',
        url:"https://api.bilibili.com/x/web-interface/view?bvid="+String(req.query.bvid)
    }).then((response)=>{
        //console.log('success')
        //console.log(JSON.stringify(response.data))
        res.send(response.data)
    }).catch((err)=>{
        //console.log(err)
        res.send(err)
    })
})
app.get('/getbilibiliuidinfo',(req,res)=>{
    axios({
        method: 'GET',
        url:"https://api.bilibili.com/x/space/acc/info?mid="+String(req.query.uid)
    }).then((response)=>{
        //console.log('success')
        //console.log(JSON.stringify(response.data))
        res.send(response.data)
    }).catch((err)=>{
        //console.log(err)
        res.send(err)
    })
})

/*server.listen(8000, function listening() {
    console.log('服务器启动成功！');
});*/
app.listen(8081,"0.0.0.0",function listening() {
    console.log('http://0.0.0.0:8081')
})
