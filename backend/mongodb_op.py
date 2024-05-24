from pydantic import BaseModel
from pymongo import MongoClient
from passlib.context import CryptContext  # Import CryptContext

# Initialize password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Define Pydantic model for user signup request
class UserSignup(BaseModel):
    name: str
    email: str
    password: str
    confirm_password: str

# MongoDB connection settingsusers
MONGO_DB_URL = "mongodb://localhost:27017/"
MONGO_DB_NAME = "users"
COLLECTION_NAME = "users"

# Initialize MongoClient
client = MongoClient(MONGO_DB_URL)
db = client[MONGO_DB_NAME]
collection = db[COLLECTION_NAME]

async def insert_user(user_data: UserSignup):
    try:
        # Check if passwords match
        if user_data.password != user_data.confirm_password:
            raise ValueError("Passwords do not match")
        
        # Hash the password
        hashed_password = pwd_context.hash(user_data.password)

        # Insert user data into MongoDB
        result = collection.insert_one({
            "name": user_data.name,
            "email": user_data.email,
            "password": hashed_password
        })
        return {"message": "User created successfully", "user_id": str(result.inserted_id)}
    except Exception as e:
        return {"error": str(e)}
