from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
import json 
import bcrypt  
from flask_cors import CORS 

# To run the app just do flask run 

app = Flask(__name__)
CORS(app) 
# To create DB enter Python interperter 
# from app import db 
# db.create_all() 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
# sqlite:///invest.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://dwzecrzckxhpgn:3ac7446ce426a9979a6c89878171e10bec6ff6756d3808b9f715091ea83e2918@ec2-174-129-255-59.compute-1.amazonaws.com:5432/dec4ii9piejutk'
app.config['SECRET_KEY'] = 'Thisissupposedtobesecret!'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(45))

    # These are relationships 
    taxes = db.relationship('Taxes', backref='user', lazy='dynamic')
    investments = db.relationship('Investments', backref='user', lazy='dynamic')
    expenses = db.relationship('Expenses', backref='user', lazy='dynamic')

class Taxes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    income = db.Column(db.Float, nullable=False)
    federal = db.Column(db.Float, nullable=False)
    state = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Investments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    principal = db.Column(db.Float, nullable = False)
    rate = db.Column(db.Float, nullable = False)
    years = db.Column(db.Float, nullable = False)
    balance = db.Column(db.Float, nullable = False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    shopping = db.Column(db.Float, nullable=False)
    gas = db.Column(db.Float, nullable=False)
    food_drink = db.Column(db.Float, nullable=False)
    entertainment = db.Column(db.Float, nullable=False)
    bills = db.Column(db.Float, nullable=False)
    automotive = db.Column(db.Float, nullable=False)
    travel = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


# END POINTS
@app.route('/addUser', methods=['POST'])
def add_user(): 
    req = request.data 
    req = json.loads(req)
    user = User.query.filter_by(username=req['username']).first()
   
    if user != None: 
        print('here1') 
        return jsonify(
            id = 0
            )
    else:
        print('here2')
        # password = str.encode(req['password'])
        # hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        newUser = User(username=req['username'], password=req['password'])
        db.session.add(newUser)
        db.session.commit() 
        user = User.query.filter_by(username=req['username']).first() 
        return jsonify(id = user.id, username = user.username)

@app.route('/login', methods=['POST'])
def check_login():
    req = request.data 
    req = json.loads(req) 
    username = req['username']
    password = req['password']
    # password = str.encode(password) 
    print(password)
    user = User.query.filter_by(username=username).first() 
    if user == None:
        return jsonify(0)
    else:     
        print(user)
        dbUsername = user.username 
        dbPassword = user.password 
        # bcrypt.checkpw(password, dbPassword)
        if dbPassword == password:
            return jsonify(user.id)
        else:
            print('FALSE')
            return jsonify(0) 

@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.filter_by(id=user_id).first()
    return f'The user is: {user.user_id}'

@app.route('/user/getall', methods=['GET'])
def get_all_users():
    users = User.query.all() 
    print(users)
    return f'All the users:'

@app.route('/taxes', methods=['POST'])
def add_taxes():
    req = request.data 
    req = json.loads(req) # turns it into json
    user_id = req['user_id']
    taxes = Taxes.query.filter_by(user_id=user_id).first() 
    if taxes == None:
        taxes = Taxes(income=req['income'], federal=req['federal'], state=req['state'], user_id=req['user_id'])
        db.session.add(taxes) 
        db.session.commit()
        return jsonify(
            income=taxes.income, federal=taxes.federal, state=taxes.state, user_id=taxes.user_id
        )
    else:
        taxes.income = req['income']
        taxes.federal = req['federal']
        taxes.state = req['state']
        db.session.commit()
        return jsonify(
            income=taxes.income, federal=taxes.federal, state=taxes.state, user_id=taxes.user_id
        )

@app.route('/taxes/<user_id>', methods=['GET'])
def get_taxes(user_id):
    taxes = Taxes.query.filter_by(user_id=user_id).first()
    if taxes == None:
        return jsonify(
            status=0 
        )
    else:
        return jsonify(
            income=taxes.income, federal=taxes.federal, state=taxes.state, user_id=taxes.user_id
        )

@app.route('/expenses', methods=['POST'])
def create_expenses():
    req = request.data 
    req = json.loads(req) 
    user_id = req['user_id']
    expense = Expenses.query.filter_by(user_id=user_id).first()
    if expense == None:
        newExpense = Expenses(shopping=req['shopping'], gas=req['gas'], food_drink=req['food_drink'], entertainment=req['entertainment'], bills=req['bills'], automotive=req['automotive'], travel=req['travel'], total=req['total'], user_id=user_id)
        db.session.add(newExpense)
        db.session.commit() 
        print('here')
        return jsonify(
            shopping=newExpense.shopping, gas=newExpense.gas, food_drink=newExpense.food_drink, entertainment=newExpense.entertainment, bills=newExpense.bills, automotive=newExpense.automotive, travel=newExpense.travel, total=newExpense.total, user_id=newExpense.user_id
        )
    else:
        expense.shopping = req['shopping']
        expense.gas = req['gas']
        expense.food_drink = req['food_drink']
        expense.entertainment = req['entertainment']
        expense.bills = req['bills']
        expense.automotive = req['automotive']
        expense.travel = req['travel']
        expense.total = req['total']
        db.session.commit()
        print('here2')
        return jsonify(
            shopping=expense.shopping, gas=expense.gas, food_drink=expense.food_drink, entertainment=expense.entertainment, bills=expense.bills, automotive=expense.automotive, travel=expense.travel, total=expense.total, user_id=user_id
        )

@app.route('/expenses/<user_id>', methods=['GET'])
def get_expenses(user_id):
    expenses = Expenses.query.filter_by(user_id=user_id).first()
    if expenses == None:
        return jsonify(
            status=0
        )
    else:
        return jsonify(
            shopping=expenses.shopping, gas=expenses.gas, food_drink=expenses.food_drink, entertainment=expenses.entertainment, bills=expenses.bills, automotive=expenses.automotive, travel=expenses.travel, total=expenses.total, user_id=user_id
        )


@app.route('/investments', methods=['POST'])
def add_investments():
    req = request.data 
    req = json.loads(req) 
    user_id = req['user_id']
    investments = Investments.query.filter_by(user_id=user_id).first() 
    if investments == None:
        investments = Investments(principal = req['principal'], rate = req['rate'], years = req['years'], balance = req['balance'], user_id = user_id)
        db.session.add(investments)
        db.session.commit() 
        return jsonify(
            principal=investments.principal, rate = investments.rate, years = investments.years, balance = investments.balance, user_id = user_id
        )
    else: 
        investments.principal = req['principal']
        investments.rate = req['rate']
        investments.years = req['years']
        investments.balance = req['balance']
        db.session.commit()
        return jsonify(
            principal=investments.principal, rate = investments.rate, years = investments.years, balance = investments.balance, user_id = user_id
        )


@app.route('/investments/<user_id>', methods=['GET'])
def get_investments(user_id):
    investments = Investments.query.filter_by(user_id=user_id).first() 
    if investments == None:
        return jsonify(
            status=0 
        )
    else:
        return jsonify(
            principal = investments.principal, 
            rate = investments.rate, 
            years = investments.years, 
            balance = investments.balance, 
            user_id = investments.user_id,
        )


