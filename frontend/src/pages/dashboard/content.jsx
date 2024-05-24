import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import axios from "axios";
export function Content() {
  const [fileProgress, setFileProgress] = useState({});
  const [fileStatus, setFileStatus] = useState({});
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showExistingBooks, setShowExistingBooks] = useState(false);
  const [uploadQueue, setUploadQueue] = useState([]);

  const handleSeeExistingBooks = () => {
    setShowExistingBooks(true);
  };

  const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB in bytes

  const fileInputRef = useRef(null);

  const resetUploader = () => {
    setFileProgress({});
    setFileStatus({});
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addToUploadQueue = (file) => {
    setUploadQueue((prevQueue) => [...prevQueue, file]);
  };

  const processUploadQueue = () => {
    if (uploadQueue.length > 0) {
      const file = uploadQueue[0];
      fileUploadHandler(file);
      setUploadQueue((prevQueue) => prevQueue.slice(1)); // Remove the first item (uploaded file) from the queue
    }
  };

  const fileSelectedHandler = (event) => {
    setUploadError(null);
    if (event.target.files) {
      const files = Array.from(event.target.files);
      let isValid = true;
      let fileErrors = {};

      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          fileErrors[file.name] = `File size cannot exceed 5 MB`;
          isValid = false;
        }
      }

      if (!isValid) {
        setFileStatus(fileErrors);
      } else {
        files.forEach((file) => {
          setFileProgress((prev) => ({ ...prev, [file.name]: 0 }));
          addToUploadQueue(file); // Add files to the upload queue
        });

        processUploadQueue(); // Start processing the upload queue
      }
    }
  };
  const YOUR_FASTAPI_ENDPOINT = "http://localhost:8000/upload/";
  // const fileUploadHandler = (file) => {
  //   const formData = new FormData();
  //   formData.append("uploads", file);

  //   const xhr = new XMLHttpRequest();
  //   xhr.open("POST", 'YOUR_UPLOAD_URL', true);

  //   xhr.upload.addEventListener("progress", (event) => {
  //     if (event.lengthComputable) {
  //       const progress = Math.round((event.loaded / event.total) * 100);
  //       setFileProgress((prev) => ({ ...prev, [file.name]: progress }));
  //     }
  //   });

  //   xhr.addEventListener("readystatechange", () => {
  //     if (xhr.readyState === 4) {
  //       if (xhr.status === 200) {
  //         setFileStatus((prev) => ({ ...prev, [file.name]: 'Uploaded' }));
  //         setUploadSuccess(true);
  //       } else {
  //         setFileStatus((prev) => ({
  //           ...prev,
  //           [file.name]: `An error occurred while uploading the file. Server response: ${xhr.statusText}`,
  //         }));
  //       }
  //     }
  //   });

  //   xhr.send(formData);
  // };
  const fileUploadHandler = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(YOUR_FASTAPI_ENDPOINT, formData)
      .then((response) => {
        console.log(response.data);
        setFileStatus((prev) => ({ ...prev, [file.name]: "Uploaded" }));
        setUploadSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setFileStatus((prev) => ({
          ...prev,
          [file.name]: `An error occurred while uploading the file: ${error.response.data.detail}`,
        }));
      });
  };
  useEffect(() => {
    processUploadQueue(); // Listen for changes in the upload queue and trigger the upload process
  }, [uploadQueue]);

  return (
    <div className="mt-12 mb-12 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Content
          </Typography>
        </CardHeader>
        <CardBody className="px-6">
          {uploadSuccess ? (
            <div className="flex flex-col gap-2">
              {Object.values(fileStatus).some(
                (status) => status !== "Uploaded"
              ) ? (
                <span className="text-xs text-red-500">
                  Upload completed, but with errors.
                </span>
              ) : null}
              <div className="btn-group w-full">
                <span className="btn btn-success w-1/2">Success!</span>
                <button
                  className="btn ml-20 bg-sky-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-12"
                  onClick={resetUploader}
                >
                  Upload Another
                </button>
              </div>
            </div>
          ) : (
            <div className="form-control w-full">
              Upload Books
              <input
                type="file"
                className="mt-3 file-input file-input-bordered file-input-primary w-full"
                onChange={fileSelectedHandler}
                accept=".pdf" // Adjust accepted file types here
                ref={fileInputRef}
                multiple
              />
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {uploadError}
                </span>
              </label>
            </div>
          )}

          <div className="overflow-x-auto flex gap-2 flex-col-reverse">
            {Object.entries(fileProgress).map(([fileName, progress]) => (
              <div key={fileName} className="text-xs flex flex-col gap-1">
                <div style={{ marginBottom: "8px" }}>
                  <p>{fileName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <progress
                    className="progress progress-primary w-full"
                    value={progress}
                    max="100"
                  />
                  {progress === 100 && (
                    <>
                      {fileStatus[fileName] === "Uploaded" ? (
                        <FaCheck className="text-xl text-green-500 mr-4" />
                      ) : (
                        <FaTimes className="text-xl text-red-500 mr-4" />
                      )}
                    </>
                  )}
                </div>
                <p className="text-red-500">
                  {fileStatus[fileName] !== "Uploaded"
                    ? fileStatus[fileName]
                    : ""}
                </p>
              </div>
            ))}
          </div>
          <Link to="/dashboard/bookslist">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-12">
              See Existing Books
            </button>
          </Link>
          {showExistingBooks && (
            <div className="existing-books-section">
              <h2>Existing Books</h2>
              {/* Placeholder content for existing books */}
              <p>Book 1</p>
              <p>Book 2</p>
              {/* Add logic here to display existing books */}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Content;
