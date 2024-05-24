# booklist.py

from fastapi import APIRouter, HTTPException
from pathlib import Path
import shutil

router = APIRouter()

UPLOAD_FOLDER = Path("docs")

@router.get("/books")
async def get_books():
    try:
        books = [file.name for file in UPLOAD_FOLDER.glob("*") if file.is_file()]
        return {"books": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/books/{file_name}")
async def delete_book(file_name: str):
    try:
        file_path = UPLOAD_FOLDER / file_name
        if file_path.exists():
            file_path.unlink()
            return {"message": "Book deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Book not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
