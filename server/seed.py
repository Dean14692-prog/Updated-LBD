# from random import randint, choice as random_choice
# from faker import Faker
# import bcrypt

# from app import app, db
# from models import User, BusinessProfile, Category, Review

# fake = Faker()

# def run_seeds():
#     with app.app_context():
#         db.drop_all()
#         db.create_all()

#         # -------------------- CATEGORIES --------------------
#         cafe_category = Category(name="Cafe")
#         repair_category = Category(name="Repair")
#         db.session.add_all([cafe_category, repair_category])
#         db.session.commit()

#         # -------------------- USERS --------------------
#         consumer_user = User(
#             fullname="Sam",
#             email="sam@gmail.com",
#             role="consumer",
#             password=bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
#         )
#         business_owner_user = User(
#             fullname="Yelsin",
#             email="yelsin@gmail.com",
#             role="business_owner",
#             password=bcrypt.hashpw("password456".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
#         )
#         db.session.add_all([consumer_user, business_owner_user])
#         db.session.commit()

#         # -------------------- BUSINESS PROFILES --------------------
#         cafe_business = BusinessProfile(
#             name="Cafe Good Vibes",
#             contact="0712345678",
#             email="cafe@goodvibes.com",
#             location="Nakuru",
#             description="A cozy cafe with great coffee.",
#             category_id=cafe_category.id,
#             owner_id=business_owner_user.id
#         )
#         repair_business = BusinessProfile(
#             name="Techie Repair",
#             contact="0787654321",
#             email="contact@techierepair.com",
#             location="Nairobi",
#             description="Gadget repair and more.",
#             category_id=repair_category.id,
#             owner_id=business_owner_user.id
#         )
#         db.session.add_all([cafe_business, repair_business])
#         db.session.commit()

#         # -------------------- REVIEWS --------------------
#         review_1 = Review(
#             user_id=consumer_user.id,
#             business_profile_id=cafe_business.id,
#             rating=5,
#             comments="Fantastic coffee and ambiance!"
#         )
#         review_2 = Review(
#             user_id=business_owner_user.id,
#             business_profile_id=cafe_business.id,
#             rating=4,
#             comments="Nice spot for meetings."
#         )
#         review_3 = Review(
#             user_id=consumer_user.id,
#             business_profile_id=repair_business.id,
#             rating=4,
#             comments="Quick repair service."
#         )
#         db.session.add_all([review_1, review_2, review_3])
#         db.session.commit()

#         print("🌱 Seeding complete!")

# if __name__ == "__main__":
#     run_seeds()

from random import randint, choice as random_choice
from faker import Faker
import bcrypt

from app import app, db
from models import User, BusinessProfile, Category, Review

fake = Faker()
image_links = [
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1556742044-3c52d6e88c62",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33",
    "https://images.unsplash.com/photo-1555679427-ea3c0456881b",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://images.unsplash.com/photo-1577908190921-3ce10be7b4b8",
    "https://images.unsplash.com/photo-1533025787775-1cde6e668a91",
    "https://images.unsplash.com/photo-1618221652604-cb344224cd5f"
]


def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # -------------------- CATEGORIES --------------------
        category_names = ["Cafe", "Repair", "Salon", "Printing", "Butchery", "Gym", "Electronics", "Restaurant", "Barbershop", "Pharmacy"]
        categories = [Category(name=name) for name in category_names]
        db.session.add_all(categories)
        db.session.commit()

        # -------------------- USERS --------------------
        users = []
        for i in range(5):  # Consumers
            users.append(User(
                fullname=fake.name(),
                email=fake.email(),
                role="consumer",
                password=bcrypt.hashpw("pass1234".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ))
        for i in range(5):  # Business Owners
            users.append(User(
                fullname=fake.name(),
                email=fake.email(),
                role="business_owner",
                password=bcrypt.hashpw("bizpass456".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ))
        db.session.add_all(users)
        db.session.commit()

        # -------------------- BUSINESS PROFILES --------------------
        locations_nairobi = ["CBD, Nairobi", "Westlands, Nairobi", "Kilimani, Nairobi"]
        locations_nakuru = ["CBD, Nakuru", "Lanet, Nakuru", "Naka, Nakuru"]
        all_locations = locations_nairobi + locations_nakuru

        business_profiles = []
        for i in range(10):
            business_profiles.append(BusinessProfile(
                name=fake.company(),
                contact=fake.phone_number(),
                email=fake.company_email(),
                location=random_choice(all_locations),
                description=fake.sentence(),
                category_id=random_choice(categories).id,
                owner_id=random_choice([u.id for u in users if u.role == "business_owner"]),
                image_url=random_choice(image_links)
            ))
        db.session.add_all(business_profiles)
        db.session.commit()

        # -------------------- REVIEWS --------------------
        reviews = []
        for i in range(15):
            reviews.append(Review(
                user_id=random_choice([u.id for u in users if u.role == "consumer"]),
                business_profile_id=random_choice(business_profiles).id,
                rating=randint(3, 5),
                comments=fake.sentence()
            ))
        db.session.add_all(reviews)
        db.session.commit()

        print("🌱 Seeding complete with more data!")

if __name__ == "__main__":
    run_seeds()
