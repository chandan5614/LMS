from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import certifi
import datetime
import json
import bcrypt

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb+srv://ucmadmin:Ucm%402024@lms-cluster.fb5iomn.mongodb.net/lms_testing"
#app.config["MONGO_URI"] = "mongodb://localhost:27017/LMS"
mongo = PyMongo(app,tlsCAFile=certifi.where())


############################# USER APIS ################################
@app.route('/users/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    existing_user = mongo.db.user.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "Email is already registered"}), 400

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    if role == 'Admin':
        # new_user = {
        #     "email": email,
        #     "password": hashed_password,
        #     "role": role
        # }
        new_user= data;
        data['password'] = hashed_password;
        mongo.db.admin.insert_one(new_user)
    elif role == 'Member':
        # new_user = {
        #     "email": email,
        #     "password": hashed_password,
        #     "role": role
        # }
        new_user= data;
        data['password'] = hashed_password;
        mongo.db.user.insert_one(new_user)
    else:
        return jsonify({"error": "Invalid role"}), 400

    return jsonify({
        "message": "User registered successfully.",
        "userId": str(new_user["_id"]),
        "role": new_user["role"]
    }), 201

@app.route('/users/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    user_collection = mongo.db.user if role != 'Admin' else mongo.db.admin
    user = user_collection.find_one({"email": email})

    if not user or not bcrypt.checkpw(password.encode(), user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "userId": str(user["_id"]),
        "role": user["role"]
    }), 200
    
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    mongo.db.user.insert_one(data)
    return jsonify(message="User added successfully"), 201

@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    mongo.db.user.update_one({'_id': ObjectId(user_id)}, {'$set': data})
    return jsonify(message="User updated successfully")

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user_doc = mongo.db.user.find_one({'_id': ObjectId(user_id)})
    user = json.loads(json.dumps(user_doc, default=str))
    return jsonify(user), 200

@app.route('/users', methods=['GET'])
def get_all_users():
    user_doc = list(mongo.db.user.find())
    users = [json.loads(json.dumps(user, default=str)) for user in user_doc]
    return jsonify(users), 200



############################# BRANCH APIS ################################

@app.route('/branches', methods=['POST'])
def add_branch():
    data = request.json
    mongo.db.branch.insert_one(data)
    return jsonify(message="Branch added successfully"), 201

@app.route('/branches/<branch_id>', methods=['PUT'])
def update_branch(branch_id):
    data = request.json
    if '_id' in data:
        data.pop('_id', None)
    print(data)
    mongo.db.branch.update_one({'_id': ObjectId(branch_id)}, {'$set': data})
    return jsonify(message="Branch updated successfully")

@app.route('/branches', methods=['GET'])
def get_branches():
    branches = list(mongo.db.branch.find())
    branches_json = [json.loads(json.dumps(branch, default=str)) for branch in branches]
    return jsonify(branches_json), 200

@app.route('/branches/<branch_id>', methods=['GET'])
def get_branch(branch_id):
    branch = mongo.db.branch.find_one({'_id': ObjectId(branch_id)})
    branch_json = json.loads(json.dumps(branch, default=str))
    return jsonify(branch_json), 200

@app.route('/branches/<branch_id>', methods=['DELETE'])
def delete_branch(branch_id):
    mongo.db.branch.delete_one({'_id': ObjectId(branch_id)})
    return jsonify(message="Branch deleted successfully")

############################# BOOK APIS ################################

@app.route('/books', methods=['POST'])
def add_book():
    data = request.json
    mongo.db.copies.insert_one(data)
    return jsonify(message="Book added successfully"), 201

@app.route('/books', methods=['GET'])
def get_books():
    books_doc = list(mongo.db.copies.find().sort("title", 1))
    books = [json.loads(json.dumps(book, default=str)) for book in books_doc]
    return jsonify(books), 200

@app.route('/books/<branch_id>/branch', methods=['GET'])
def get_books_from_branch(branch_id):
    books_doc = list(mongo.db.copies.find({'branch_id': ObjectId(branch_id)}))
    books = [json.loads(json.dumps(book, default=str)) for book in books_doc]
    return jsonify(books), 200

@app.route('/books/<copy_id>', methods=['GET'])
def get_book(copy_id):
    book_doc = mongo.db.copies.find_one({'_id': ObjectId(copy_id)})
    book = json.loads(json.dumps(book_doc, default=str))
    return jsonify(book), 200

@app.route('/books/<ISBN>/copies', methods=['GET'])
def get_book_copies(ISBN):
    copies_doc = list(mongo.db.copies.find({'ISBN': ISBN}))
    copies = [json.loads(json.dumps(copy, default=str)) for copy in copies_doc]
    return jsonify(copies), 200

@app.route('/books/<copy_id>', methods=['PUT'])
def update_book(copy_id):
    data = request.json
    mongo.db.copies.update_one({'_id': ObjectId(copy_id)}, {'$set': data})
    return jsonify(message="Book updated successfully")

@app.route('/books/<copy_id>', methods=['DELETE'])
def delete_book(copy_id):
    mongo.db.copies.delete_one({'_id': ObjectId(copy_id)})
    return jsonify(message="Book deleted successfully")

@app.route('/books/available', methods=['GET'])
def get_available_copies():
    books_doc = list(mongo.db.copies.find({'copies.copiesDetails.status': 'Available'}).sort("title", 1))
    available_books = []
    
    for book in books_doc:
        available_copies = []
        for copy in book['copies']:
            available_copy_details = [copy_detail for copy_detail in copy['copiesDetails'] if copy_detail['status'] == 'Available']
            if available_copy_details:
                copy['copiesDetails'] = available_copy_details
                available_copies.append(copy)
        
        if available_copies:
            book['copies'] = available_copies
            available_books.append(book)
    
    return jsonify([json.loads(json.dumps(book, default=str)) for book in available_books]), 200


@app.route('/books/<book_id>/add_copy', methods=['POST'])
def add_copy(book_id):
    data = request.json
    branch_name = data.get('branchName')
    copy_detail = data.get('copyDetail')
    
    if not branch_name or not copy_detail:
        return jsonify(message="Branch name and copy detail are required"), 400

    book = mongo.db.copies.find_one({'_id': ObjectId(book_id)})
    if not book:
        return jsonify(message="Book not found"), 404

    # Flag to check if branch is found
    branch_found = False
    
    for copy in book.get('copies', []):
        if copy['branchName'] == branch_name:
            copy['copiesDetails'].append(copy_detail)
            branch_found = True
            break

    # If branch was not found, create a new entry
    if not branch_found:
        new_copy = {
            'branchName': branch_name,
            'copiesDetails': [copy_detail]
        }
        print(new_copy)
        book['copies'].append(new_copy)

    mongo.db.copies.update_one({'_id': ObjectId(book_id)}, {'$set': book})
    return jsonify(message="Copy added successfully"), 200




############################# TRANSACTION APIS ################################

@app.route('/books/borrow', methods=['POST'])
def borrow_book():
    data = request.json
    book_id = ObjectId(data['book_id'])
    copy_id = data['copy_id']
    transaction = {
        "user_id": ObjectId(data['user_id']),
        "book_id": book_id,
        "copy_id": copy_id,
        "branch_name": data['branch_id'],
        "checkout_date": datetime.datetime.utcnow(),
        "checkin_date": None,
        "late_fee": 0
    }
    mongo.db.transaction.insert_one(transaction)
    
    # Update the copy's status to 'borrowed' in the book's copiesDetails
    mongo.db.copies.update_one(
    {'_id': book_id, 'copies.copiesDetails.copyNumber': copy_id},
    {'$set': {'copies.$[outer].copiesDetails.$[inner].status': 'Borrowed'}},
    array_filters=[{'outer.branchName': data['branch_id']}, {'inner.copyNumber': copy_id}]
    )
    
    return jsonify(message="Book borrowed successfully"), 201


@app.route('/books/return', methods=['POST'])
def return_book():
    data = request.json
    transaction_id = ObjectId(data['_id'])
    book_id = ObjectId(data['book_id'])
    copy_id = data['copy_id']
    branch_name = data['branch_id']

    # Update the transaction with the return date
    mongo.db.transaction.update_one(
        {'_id': transaction_id},
        {'$set': {'checkin_date': datetime.datetime.utcnow()}}
    )
    
    # Update the copy's status to 'Available'
    mongo.db.copies.update_one(
        {'_id': book_id, 'copies.copiesDetails.copyNumber': copy_id},
        {'$set': {'copies.$[outer].copiesDetails.$[inner].status': 'Available'}},
        array_filters=[{'outer.branchName': branch_name}, {'inner.copyNumber': copy_id}]
    )
    
    return jsonify(message="Book returned successfully"), 200


@app.route('/users/<user_id>/transactions', methods=['GET'])
def get_user_transactions(user_id):
    transactions_doc = list(mongo.db.transaction.find({'user_id': ObjectId(user_id)}))
    transactions = [json.loads(json.dumps(transaction, default=str)) for transaction in transactions_doc]
    return jsonify(transactions), 200


@app.route('/transactions', methods=['GET'])
def get_all_transactions():
    transactions_doc = list(mongo.db.transaction.find())
    transactions = [json.loads(json.dumps(transaction, default=str)) for transaction in transactions_doc]
    return jsonify(transactions), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080,debug=True)
