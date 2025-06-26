from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_migrate import Migrate
from flask_cors import CORS
import bcrypt

from models import db, User, BusinessProfile, Category, Review

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)


class UserResource(Resource):
    def get(self):
        print("GET /users called")
        users = User.query.all()
        return make_response({"users": [user.to_dict() for user in users]}, 200)

    def post(self):
        print("POST /users called")
        try:
            data = request.get_json()
            print("Received data:", data)

            if not all(k in data for k in ("fullname", "email", "password", "role")):
                return make_response({"message": "Missing required fields"}, 400)

            hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

            new_user = User(
                fullname=data['fullname'],
                email=data['email'],
                password=hashed_password,
                role=data['role']
            )

            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({"message": "User already exists, please login", "error": str(e)}, 500)

api.add_resource(UserResource, '/users')



class UserByIdResource(Resource):
    def get(self, user_id):
        user = db.session.get(User, user_id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        return make_response(user.to_dict(), 200)

    def patch(self, user_id):
        data = request.get_json()
        user = db.session.get(User, user_id)
        if not user:
            return make_response({"message": "User not found"}, 404)

        if 'fullname' in data:
            user.fullname = data['fullname']
        if 'email' in data:
            user.email = data['email']
        if 'password' in data:
            user.password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        if 'role' in data:
            user.role = data['role']
        db.session.commit()
        return make_response({"message": "User updated successfully"}, 200)

    def delete(self, user_id):
        user = db.session.get(User, user_id)
        if not user:
            return make_response({"message": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({"message": "User deleted successfully"}, 200)

api.add_resource(UserByIdResource, '/users/<int:user_id>')



class CategoriesResource(Resource):
    def get(self):
        categories = Category.query.all()
        return make_response([cat.to_dict() for cat in categories], 200)

api.add_resource(CategoriesResource, '/categories')


class BusinessProfilesResource(Resource):
    def get(self):
        business_profiles = BusinessProfile.query.all()
        return make_response([bp.to_dict() for bp in business_profiles], 200)

api.add_resource(BusinessProfilesResource, '/business_profiles')



class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return make_response({"message": "Email and password required"}, 400)

        user = User.query.filter_by(email=email).first()
        if not user:
            return make_response({"message": "User not found"}, 404)

        # Compare password using bcrypt
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return make_response({"message": "Invalid password"}, 401)

        # If password is correct, return user info
        return make_response(user.to_dict(), 200)

api.add_resource(LoginResource, '/login')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database initialized.")
    app.run(debug=True, port=5555)
