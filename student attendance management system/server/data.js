var express=require("express")
var mysql=require("mysql")
var app=express()
var cors=require("cors")
var bodyparser=require("body-parser")

var db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root1234",
    database:"dbms",
});

app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))


app.get("/api/get",async (req,res)=>{
    var sql="select * from reg";
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
})

app.post("/api/insert",(req,res)=>{
    var name=req.body.name;
    var mail=req.body.mail;
    var phone=req.body.phone;
    var sql="insert into reg values(?,?,?)";
    db.query(sql,[name,mail,phone],(err,result)=>{
        if(!err)
        {
            console.log("hey");
            console.log(result);
        }
        else
        {
            console.log(err);
        }
    });
})
app.get("/api/login", async (req,res)=>{
    console.log("Login request");
    var password=req.body.password;
    console.log(password);
    var sql="select * from reg where mail=?";
    db.query(sql,[password],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("result:")
            console.log(result);
            res.send(result);
        }
    })
})
app.listen(3002,()=>{
    console.log("listen on 3002")
})