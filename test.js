

class Api {
    constructor(){
        this.mongoclient = require("mongodb").MongoClient;
        this.url = "mongodb://womadao:8848jQd*()123@47.243.100.2:27017";
    }
    getmcban(){
        var __this = this;
        return new Promise((resolve, reject) =>{
            __this.mongoclient.connect(__this.url+"/womadaobanlist", (err, client)=>{
                client.db("womadaobanlist").collection("mcbanlist").find().toArray(function(error,res){
                    if(error){
                        reject(error);
                        return;
                    }
                    
                    resolve(res);
                });
            });
        })
    }
    writedownload(ip){
        var __this = this;
        return new Promise((resolve, reject) =>{
            __this.mongoclient.connect(__this.url+"/womadaobanlist", (err, client)=>{
                client.db("womadaobanlist").collection("downloadip").find().toArray(function(error,res){
                    if(error){
                        reject(error);
                        return;
                    }
                    
                    resolve(res);
                });
            });
        })
    }
}
module.exports=new Api();