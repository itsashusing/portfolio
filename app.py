from flask import Flask, render_template, request , flash

import creads

app = Flask(__name__)


# Create a secret key for form
app.config['SECRET_KEY']= creads.key


print(app.config['SECRET_KEY'])
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/form')
def form():
    return render_template('form.html')


@app.route('/uploaddata',methods=['GET','POST'] )
def uploaddata():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')
    f = open('data.txt',"a")
    f.write(f"\n Name= {name}, Email={email} , Mobile No.={subject}, Message = {message}")
        
    return render_template('user.html',dname=name,demail=email,dsubject=subject,dmessage=message),flash("Form Submitted Successfully")
    
if __name__=='__main__':
    app.run()