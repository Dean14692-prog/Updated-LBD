from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import MetaData, Enum

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    role = db.Column(Enum('consumer', 'business_owner', name='user_roles', native_enum=False), nullable=False)
    password = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    business_profiles = db.relationship('BusinessProfile', back_populates='owner', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.fullname,
            "email": self.email,
            "role": self.role,
            "reviews": [review.to_dict() for review in self.reviews]
        }

    def __repr__(self):
        return f"<User id={self.id} name={self.fullname} email={self.email}>"

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    # image_url = db.Column(db.String) 

    business_profiles = db.relationship('BusinessProfile', back_populates='category')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            # "image_url": self.image_url 
        }

    def __repr__(self):
        return f"<Category id={self.id} name={self.name}>"

class BusinessProfile(db.Model):
    __tablename__ = 'business_profiles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    contact = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    location = db.Column(db.String)
    description = db.Column(db.Text)
    image_url = db.Column(db.String)

    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    category = db.relationship('Category', back_populates='business_profiles')
    owner = db.relationship('User', back_populates='business_profiles')
    reviews = db.relationship('Review', back_populates='business_profile', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "contact": self.contact,
            "email": self.email,
            "location": self.location,
            "description": self.description,
            "category": self.category.to_dict() if self.category else None,
            "reviews": [review.to_dict() for review in self.reviews],
            "image_url": self.image_url
        }


    

    def __repr__(self):
        return f"<BusinessProfile id={self.id} name={self.name} email={self.email}>"

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    business_profile_id = db.Column(db.Integer, db.ForeignKey('business_profiles.id'), nullable=False)
    rating = db.Column(db.Integer)
    comments = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='reviews')
    business_profile = db.relationship('BusinessProfile', back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "comments": self.comments,
            "created_at": self.created_at.isoformat(),
            "user": {
                "id": self.user.id,
                "name": self.user.fullname
            }
        }

    def __repr__(self):
        return f"<Review id={self.id} rating={self.rating} user_id={self.user_id}>"
