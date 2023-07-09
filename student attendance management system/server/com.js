var express=require("express")
var app=express()
var mysql=require("mysql")
var cors=require("cors")
var bodyparser=require("body-parser")
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"samo@2004",
    database:"dbms",
});

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get("/api/get",(req,res)=>{
    const sql="SELECT * FROM movie";
    db.query(sql,(err,result)=>{
        if(!err){
        console.log(result)
        res.send(result)
        }
        else{
            console.log(err)
            res.send(err);
        }
    })
})
app.post("/api/insert",(req,res)=>{
    const mname=req.body.mname;
    const mrev=req.body.mrev;
    const sql="INSERT INTO movie(mname,mrev) values(?,?)"
    db.query(sql,[mname,mrev],(er,res)=>{
        console.log(er)
    })
})
app.listen(3001,()=>{
    console.log("listen on 3001")
})
