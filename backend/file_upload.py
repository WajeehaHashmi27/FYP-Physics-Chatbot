# file_upload.py
from fastapi import File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pathlib import Path

async def upload_file(file: UploadFile):
    UPLOAD_FOLDER = Path("docs")
    UPLOAD_FOLDER.mkdir(exist_ok=True)

    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        contents = await file.read()
        with open(UPLOAD_FOLDER / file.filename, "wb") as f:
            f.write(contents)
        return JSONResponse(status_code=200, content={"message": "File uploaded successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
