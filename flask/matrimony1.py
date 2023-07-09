from flask import Flask,render_template,redirect,url_for,request,session,flash
from flask_mysqldb import MySQL
import MySQLdb
import re
import json

import firebase_admin
from firebase_admin import credentials, initialize_app, storage
import cv2

cred = credentials.Certificate("serviceAccountKey.json")
initialize_app(cred, {'storageBucket': 'image-upload-2565a.appspot.com'})

app=Flask(__name__)
app.secret_key="123"

app.config["MYSQL_HOST"]="localhost"
app.config["MYSQL_USER"]="rayhon2"
app.config["MYSQL_PASSWORD"]="root"
app.config["MYSQL_DB"]="matrimony"

mysql=MySQL(app)

@app.route("/",methods=['GET','POST'])

def register_page():
    if request.method=="POST":
        name=request.form['name']
        mail=request.form['mail']
        phone=int(request.form['phone'])
        password=request.form['password']
        religion=request.form['religion']
        caste=request.form['caste']
        salary=int(request.form['salary'])
        age=int(request.form['age'])
        gender=request.form['gender']
        cursor=mysql.connection.cursor()
        cursor.execute("SELECT * FROM login where mail=%s or phoneno=%s",(mail,phone))
        account=cursor.fetchone()
        if account:
            msg="account already exists"
            flash(msg,category="danger")
            return redirect(url_for("register_page"))
        else:
            cursor.execute("INSERT INTO login(name,mail,gender,phoneno,password,religion,caste,salary,age) values(%s,%s,%s,%s,%s,%s,%s,%s,%s)",(name,mail,gender,phone,password,religion,caste,salary,age))
            mysql.connection.commit()
            msg="account successfuly created"
            flash(msg,category="danger")
            cursor.execute("SELECT id FROM login WHERE mail=%s",(mail,))
            user_id=cursor.fetchone()
            data={"name":name,"mail":mail,"phone":phone,"id":user_id}
            return redirect(url_for('profile1'))
    return render_template("mat_registration.html")



@app.route("/login",methods=['GET','POST'])

def login_page():
    if request.method=="POST" and 'name' in request.form and 'password' in request.form:
        name=request.form['name']
        password=request.form['password']
        cursor=mysql.connection.cursor()
        cursor.execute("SELECT * FROM login where name=%s and password=%s",(name,password))
        account=cursor.fetchone()
        if account:
             cursor.execute("select id from login where name=%s and password=%s",(name,password,))
             global id
             id=cursor.fetchone()[0]
             cursor.execute("select gender from login where id=%s",(id,))
             gender=cursor.fetchone()[0]
             cursor.execute("select mail from login where id=%s",(id,))
             mail=cursor.fetchone()[0]
             cursor.execute("select phoneno from login where id=%s",(id,))
             phone=cursor.fetchone()[0]
             cursor.execute("select gender from login where id=%s",(id,))
             gender=cursor.fetchone()[0]
             session['username']=name
             session['id']=id
             session['gender']=gender
             session['mail']=mail
             session['phone']=phone
             session['loggedin']=True
             data={"name":name,"mail":mail,"phone":phone,"id":id}
             msg="logged in successfully as {} and id is{}".format(session['username'],session['id'])
             flash(msg,category="success")
             return render_template("mat_profile.html",msg=msg,data=data)
        else:
            msg="account does not exists"
            flash(msg,category="danger")
            return render_template("mat_login.html",msg=msg)
    return render_template("mat_login.html")


@app.route("/logout",methods=['GET','POST'])

def logout_page():
     if 'loggedin' in session:
        session.pop('loggedin',None)
        session.pop('username',None)
        session.pop('gender',None)
        session.pop('id',None)
     return redirect(url_for('login_page'))

@app.route("/profile",methods=['GET','POST'])

def profile():
    if 'loggedin' in session:
        data={"name":session['username'],"mail":session['mail'],"phone":session['phone'],"id":session['id']}
        return render_template("mat_profile.html",data=data)
    else:
        return render_template("mat_login.html")

@app.route("/prefernce",methods=['GET','POST'])

def preference_page():
    data=[]
    if request.method=="POST" and 'loggedin' in session and request.form['age']!="":
        age=int(request.form['age'])
        user_id=int(session['id'])
        caste=request.form['caste']
        religion=request.form['religion']
        cursor=mysql.connection.cursor()
        cursor.execute("INSERT INTO preference VALUES(%s,%s,%s,%s)",(age,user_id,caste,religion))
        cursor.execute("SELECT * FROM login WHERE id<>%s and (age=%s or caste=%s or religion=%s)",(user_id,age,caste,religion,))
        data=cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
        return render_template("mat_preference.html",data=data,name=session['username'],mail=session['mail'])
    elif 'loggedin' in session:
        return render_template("mat_preference.html",name=session['username'],mail=session['mail'])
    else:
        return render_template("mat_login.html")

@app.route("/update_profile",methods=['GET','POST'])

def update_profile_page():
    user_id=0
    if request.method=="POST" and 'loggedin' in session:
        cursor=mysql.connection.cursor()
        cursor.execute("select * from login where id=%s",(user_id,))
        data=cursor.fetchone()
        name=request.form['name']
        mail=request.form['mail']
        caste=request.form['caste']
        religion=request.form['religion']
        salary=request.form['salary']
        age=request.form['age']
        phone=request.form['phone']
        cursor.execute("UPDATE login set name=%s,caste=%s,religion=%s,salary=%s,age=%s,phoneno=%s,mail=%s where id=%s",(name,caste,religion,salary,age,phone,mail,user_id,))
        mysql.connection.commit()
        msg="account successfully updated"
        flash(msg,category="success")
        return render_template("mat_profile1.html",data=data)
    elif 'loggedin' in session:
        cursor=mysql.connection.cursor()
        print(user_id)
        cursor.execute("select * from login where id=%s",(user_id,))
        data=cursor.fetchone()
        cursor.close()
    else:
        msg="account not logged in"
        flash(msg,category="danger")
        return render_template("mat_login.html")
    return render_template("mat_profile1.html",data=data,id=user_id)

@app.route("/payment",methods=['GET','POST'])

def payment_page():
    if request.method=="POST" and request.form['gold']!="" and request.form['assisted']=="":
        package="gold"
        pay_type=request.form['payment']
        amount=int(request.form['gold'])
        cursor=mysql.connection.cursor()
        cursor.execute("SELECT CURRENT_DATE FROM DUAL")
        date=cursor.fetchone()
        cursor.execute("INSERT INTO payment VALUES(%s,%s,%s,%s,%s)",(id,package,amount,date,pay_type))
        mysql.connection.commit()
        msg="payment successfully completed"
        flash(msg,category="success")
        return render_template("mat_payment.html",name=session['username'])
    elif request.method=="POST" and request.form['gold']=="" and request.form['assisted']!="":
        package="assisted"
        pay_type=request.form['payment']
        amount=int(request.form['assisted'])
        cursor=mysql.connection.cursor()
        cursor.execute("SELECT CURRENT_DATE FROM DUAL")
        date=cursor.fetchone()
        cursor.execute("INSERT INTO payment VALUES(%s,%s,%s,%s,%s)",(id,package,amount,date,pay_type))
        mysql.connection.commit()
        msg="payment successfully completed"
        flash(msg,category="success")
        return render_template("mat_payment.html",name=session['username'])
    return render_template("mat_payment.html",name=session['username'],mail=session['mail'])

@app.route("/transaction")

def transaction_page():
    cursor=mysql.connection.cursor()
    cursor.execute("SELECT * FROM payment where id=(SELECT id FROM login where id=%s)",(id,))
    data=cursor.fetchall()
    cursor.close()
    return render_template("mat_transaction.html",data=data)
@app.route("/feedback",methods=["GET","POST"])
def feedback():
    if(request.method=="POST"):
        name=request.form.get('name')
        comment=request.form.get("comment")
        rating=request.form.get("rating")
        con=mysql.connection.cursor()
        con.execute("insert into Feedback(Name,Comment,Rating)values(%s,%s,%s)",(name,comment,rating))
        mysql.connection.commit()
        con.close()
        return redirect(url_for("feedback"))
    return render_template("feedback.html")

@app.route("/profile1",methods=["GET","POST"])
def profile1():
    if request.method=="POST":
        name=request.form.get("name")
        email=request.form.get("email")
        contact=request.form.get('phone')
        address=request.form.get("address")
        family=request.form.get("family")
        qualify=request.form.get('education')
        salary=request.form.get("salary")
        religion=request.form.get("religion")
        con=mysql.connection.cursor()
        con.execute("insert into Profile(Name,Email,Contact,Address,Family,Qualify,Salary,Religion)values(%s,%s,%s,%s,%s,%s,%s,%s)",
                    (name,email,contact,address,family,qualify,salary,religion))
        con.execute("SELECT user_id from Profile where Email=%s",(email,))
        global user_id
        user_id=con.fetchone()[0]
        session['username']=name
        session['id']=user_id
        session['mail']=email
        session['phone']=contact
        session['loggedin']=True
        cam=cv2.VideoCapture(0)
        while True:
            ret,frame=cam.read()
            cv2.imshow("Face Image",frame)
            print(frame)
            if cv2.waitKey(100)&0xFF==ord("q"):
                break
            cv2.imwrite("{}.png".format(name),frame)
        
    
            
        fileName = "{}.png".format(name)
        bucket = storage.bucket()
        blob = bucket.blob("images/"+fileName)
        blob.upload_from_filename(fileName)
        blob.make_public()
        mysql.connection.commit()
        con.close()
        data={"name":name,"mail":email,"phone":contact,"id":user_id}
        return render_template("mat_profile.html",data=data)
    return render_template("mat_profile2.html")
@app.route("/all_profile",methods=["GET","POST"])
def all_profile():
    con=mysql.connection.cursor()
    con.execute("select * from Profile ")
    res=con.fetchall()

    bucket = storage.bucket()
    i=0
    img=[]
    while(i<len(res)):
            blob = bucket.blob('images/'+res[i][1]+".png")
            img.append(res[i][0])
            blob.download_to_filename("C:\\Users\\rayhon samo\\Desktop\\flask1\\static\\{}.png".format(res[i][1]))
            i=i+1
    return render_template("card.html",data=res)
if __name__=="__main__":
    app.run(debug=True,port=5000)