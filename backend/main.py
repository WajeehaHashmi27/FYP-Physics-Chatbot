# main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from langchain_code import final_chain
# from langchain_code import *  # Import LangChain and OpenAI logic
from file_upload import upload_file  # Import file upload function
from booklist import router as booklist_router
from mongodb_op import UserSignup, insert_user, pwd_context 
app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from the React.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add the frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}
app.include_router(booklist_router, prefix="/api")

@app.post("/signup")
async def signup(user_data: UserSignup):
    try:
        # Validate user data and insert into MongoDB
        user_id = await insert_user(user_data)
        return {"message": "User created successfully", "user_id": user_id}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/upload/")
async def handle_upload(file: UploadFile = File(...)):
    try:
        response = await upload_file(file)  # Await the asynchronous function
        return response
    except Exception as e:
        # Handle any exceptions that might occur during the upload process
        raise HTTPException(status_code=500, detail=str(e))
# @app.post("/ask")
# async def ask_question(question):
#     try:
#         print(question)
#         # Use LangChain and OpenAI to get the answer
#         result = final_chain.invoke({"question": question})
       
#         answer = result['answer'].content
#         memory.save_context({"question": question}, {"answer": result["answer"].content})
#         memory.load_memory_variables({})
#         print(answer)

#         return {"answer": answer}
#     except KeyError as e:
#         print(f"KeyError: {e}")
#         raise HTTPException(status_code=400, detail=f"Invalid data format: {e}")
#     except Exception as e:
#         print(f"Error processing question: {e}")
#         raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")
