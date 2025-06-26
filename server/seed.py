from random import randint, choice as random_choice
from faker import Faker
import bcrypt

from app import app, db
from models import User, BusinessProfile, Category, Review

fake = Faker()

def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # -------------------- CATEGORIES --------------------
        cafe_category = Category(name="Cafe")
        repair_category = Category(name="Repair")
        db.session.add_all([cafe_category, repair_category])
        db.session.commit()

        # -------------------- USERS --------------------
        consumer_user = User(
            fullname="Sam",
            email="sam@gmail.com",
            role="consumer",
            password=bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        )
        business_owner_user = User(
            fullname="Yelsin",
            email="yelsin@gmail.com",
            role="business_owner",
            password=bcrypt.hashpw("password456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        )
        db.session.add_all([consumer_user, business_owner_user])
        db.session.commit()

        # -------------------- BUSINESS PROFILES --------------------
        cafe_business = BusinessProfile(
            name="Cafe Good Vibes",
            contact="0712345678",
            email="cafe@goodvibes.com",
            location="Nakuru",
            description="A cozy cafe with great coffee.",
            category_id=cafe_category.id,
            owner_id=business_owner_user.id
        )
        repair_business = BusinessProfile(
            name="Techie Repair",
            contact="0787654321",
            email="contact@techierepair.com",
            location="Nairobi",
            description="Gadget repair and more.",
            category_id=repair_category.id,
            owner_id=business_owner_user.id
        )
        db.session.add_all([cafe_business, repair_business])
        db.session.commit()

        # -------------------- REVIEWS --------------------
        review_1 = Review(
            user_id=consumer_user.id,
            business_profile_id=cafe_business.id,
            rating=5,
            comments="Fantastic coffee and ambiance!"
        )
        review_2 = Review(
            user_id=business_owner_user.id,
            business_profile_id=cafe_business.id,
            rating=4,
            comments="Nice spot for meetings."
        )
        review_3 = Review(
            user_id=consumer_user.id,
            business_profile_id=repair_business.id,
            rating=4,
            comments="Quick repair service."
        )
        db.session.add_all([review_1, review_2, review_3])
        db.session.commit()

        print("🌱 Seeding complete!")

if __name__ == "__main__":
    run_seeds()
