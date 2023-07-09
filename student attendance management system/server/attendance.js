var express=require("express")
var app=express()
var mysql=require("mysql")
var cors=require("cors")
var bodyparser=require("body-parser")

app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

var db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root1234",
    database:"dbms",
})

app.post("/api/insert",(req,res)=>{
    const name=req.body.name;
    const reg=req.body.reg;
    var sql="insert into studatt(name,reg) values(?,?)";
    db.query(sql,[name,reg],(err,result)=>{
        if(!err)
        {
            console.log("result added");
            console.log(result)
        }
        else
        {
            console.log("error"+err)
        }
    })
})

app.post("/api/update",(req,res)=>{
    console.log("update")
    var reg=req.body.attendancedata[0]["reg"];
    var attendance=req.body.attendancedata[0]["attendance"];
    console.log([attendance, reg]);
    var sql="update studatt set att=? where reg=?";
    db.query(sql,[attendance,reg],(err,result)=>{
        if(!err)
        {
           console.log(result);
        }
        else
        {
            console.log(err);
        }
    })
})

app.get("/api/get",async(req,res)=>{
    var sql="select * from studatt";
     db.query(sql,(err,result)=>{
        if(!err)
        {
            res.send(result);
        }
        else 
        {
            console.log(err);
        }
     })
})
app.listen(3002,()=>{
    console.log(" attendance listen on 3002");
})

