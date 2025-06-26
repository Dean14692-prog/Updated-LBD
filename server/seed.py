from random import randint
import bcrypt

from app import app, db
from models import User, BusinessProfile, Category, Review

def run_seeds():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # -------------------- CATEGORIES --------------------
        category_data = [
            {"name": "Cafe", "image_url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
            {"name": "Repair", "image_url": "https://t4.ftcdn.net/jpg/04/10/31/07/360_F_410310701_irVZAyvCWWYCiYDdvrF0wLEhjOCsXCb5.jpg"},
            {"name": "Salon", "image_url": "https://www.lakmesalon.in/images/Salon_Image_690x595px-01.jpg"},
            {"name": "Printing", "image_url": "https://static.fibre2fashion.com//articleresources/images/64/6310/SAdobeStock_892797999_Small.jpg"},
            {"name": "Butchery", "image_url": "https://www.shutterstock.com/image-photo/man-butcher-freezer-cutting-meat-600nw-2188122607.jpg"},
            {"name": "Gym", "image_url": "https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.jpg?s=612x612&w=0&k=20&c=CIdh6LPGwU6U6lbvKCdd7LcppidaYwcDawXJI-b0yGE="},
            {"name": "Electronics", "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475"},
            {"name": "Restaurant", "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARVvezGhajVZxhGfzlsYyysEgpRMxWoVzRQ&s"},
            {"name": "Barbershop", "image_url": "https://insights.ibx.com/wp-content/uploads/2023/06/kym-barbershop.jpg"},
            {"name": "Pharmacy", "image_url": "https://thumbs.dreamstime.com/b/pharmacy-otc-products-turkey-64209774.jpg"},
        ]
        categories = [Category(name=cat["name"], image_url=cat["image_url"]) for cat in category_data]
        db.session.add_all(categories)
        db.session.commit()

        # -------------------- USERS --------------------
        users = [
            User(
                fullname="Dennis Mutuku",
                email="dennis@gmail.com",
                role="consumer",
                password=bcrypt.hashpw("consumer123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ),
            User(
                fullname="Grace Wanjiru",
                email="grace@gmail.com",
                role="consumer",
                password=bcrypt.hashpw("gracepass".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ),
            User(
                fullname="Ali Mwangi",
                email="ali@gmail.com",
                role="business_owner",
                password=bcrypt.hashpw("ownerpass1".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ),
            User(
                fullname="Mary Otieno",
                email="mary@gmail.com",
                role="business_owner",
                password=bcrypt.hashpw("ownerpass2".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            ),
        ]
        db.session.add_all(users)
        db.session.commit()

        # -------------------- BUSINESS PROFILES --------------------
        owner_1 = User.query.filter_by(fullname="Ali Mwangi").first()
        owner_2 = User.query.filter_by(fullname="Mary Otieno").first()

        businesses = [
            BusinessProfile(
                name="Java House",
                contact="0722000001",
                email="contact@javahouse.co.ke",
                location="Westlands, Nairobi",
                description="Your daily dose of Kenyan coffee and snacks.",
                category_id=Category.query.filter_by(name="Cafe").first().id,
                owner_id=owner_1.id,
                image_url="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
            ),
            BusinessProfile(
                name="TechFix Electronics",
                contact="0740123456",
                email="support@techfix.co.ke",
                location="CBD, Nairobi",
                description="Expert gadget repairs with genuine parts.",
                category_id=Category.query.filter_by(name="Repair").first().id,
                owner_id=owner_2.id,
                image_url="https://t4.ftcdn.net/jpg/04/10/31/07/360_F_410310701_irVZAyvCWWYCiYDdvrF0wLEhjOCsXCb5.jpg"
            ),
            BusinessProfile(
                name="Royal Salon",
                contact="0723123456",
                email="royal@salon.co.ke",
                location="Kilimani, Nairobi",
                description="Luxury hair care and beauty treatments.",
                category_id=Category.query.filter_by(name="Salon").first().id,
                owner_id=owner_1.id,
                image_url="https://www.lakmesalon.in/images/Salon_Image_690x595px-01.jpg"
            ),
            BusinessProfile(
                name="Quick Prints",
                contact="0711223344",
                email="prints@quick.co.ke",
                location="CBD, Nakuru",
                description="Fast and quality printing services.",
                category_id=Category.query.filter_by(name="Printing").first().id,
                owner_id=owner_2.id,
                image_url="https://static.fibre2fashion.com//articleresources/images/64/6310/SAdobeStock_892797999_Small.jpg"
            ),
            BusinessProfile(
                name="Nakuru Butchery",
                contact="0799990001",
                email="info@nakurubutchery.co.ke",
                location="Lanet, Nakuru",
                description="Fresh and affordable meat products.",
                category_id=Category.query.filter_by(name="Butchery").first().id,
                owner_id=owner_1.id,
                image_url="https://www.shutterstock.com/image-photo/man-butcher-freezer-cutting-meat-600nw-2188122607.jpg"
            ),
            BusinessProfile(
                name="Iron Beast Gym",
                contact="0722334455",
                email="gym@ironbeast.co.ke",
                location="Naka, Nakuru",
                description="Your neighborhood fitness hub.",
                category_id=Category.query.filter_by(name="Gym").first().id,
                owner_id=owner_2.id,
                image_url="https://media.istockphoto.com/id/1322158059/photo/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.jpg?s=612x612&w=0&k=20&c=CIdh6LPGwU6U6lbvKCdd7LcppidaYwcDawXJI-b0yGE="
            ),
            BusinessProfile(
                name="ElectroWorld",
                contact="0733001122",
                email="sales@electroworld.co.ke",
                location="Thika Road, Nairobi",
                description="Your trusted electronics dealer.",
                category_id=Category.query.filter_by(name="Electronics").first().id,
                owner_id=owner_1.id,
                image_url="https://images.unsplash.com/photo-1518770660439-4636190af475"
            ),
            BusinessProfile(
                name="Mama's Kitchen",
                contact="0700112233",
                email="mama@kitchen.co.ke",
                location="CBD, Nairobi",
                description="Delicious Kenyan meals made fresh.",
                category_id=Category.query.filter_by(name="Restaurant").first().id,
                owner_id=owner_2.id,
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARVvezGhajVZxhGfzlsYyysEgpRMxWoVzRQ&s"
            ),
            BusinessProfile(
                name="Barber Hub",
                contact="0755001122",
                email="hub@barber.co.ke",
                location="Rongai, Nairobi",
                description="Affordable and trendy haircuts.",
                category_id=Category.query.filter_by(name="Barbershop").first().id,
                owner_id=owner_1.id,
                image_url="https://insights.ibx.com/wp-content/uploads/2023/06/kym-barbershop.jpg"
            ),
            BusinessProfile(
                name="HealthPlus Pharmacy",
                contact="0766554433",
                email="care@healthplus.co.ke",
                location="CBD, Nairobi",
                description="Reliable medicine and health advice.",
                category_id=Category.query.filter_by(name="Pharmacy").first().id,
                owner_id=owner_2.id,
                image_url="https://thumbs.dreamstime.com/b/pharmacy-otc-products-turkey-64209774.jpg"
            ),
        ]
        db.session.add_all(businesses)
        db.session.commit()

        # -------------------- REVIEWS --------------------
        reviews = [
            Review(
                user_id=User.query.filter_by(fullname="Dennis Mutuku").first().id,
                business_profile_id=BusinessProfile.query.filter_by(name="Java House").first().id,
                rating=5,
                comments="Best coffee I've had in Nairobi!"
            ),
            Review(
                user_id=User.query.filter_by(fullname="Grace Wanjiru").first().id,
                business_profile_id=BusinessProfile.query.filter_by(name="TechFix Electronics").first().id,
                rating=4,
                comments="Quick and affordable repairs."
            )
        ]
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding complete!")

if __name__ == "__main__":
    run_seeds()
