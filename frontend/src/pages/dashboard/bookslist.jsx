import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";

export function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of file names from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/books"); // Update the endpoint as per your backend
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (fileName) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:8000/api/books/${fileName}`);
        setBooks((prevBooks) => prevBooks.filter((book) => book !== fileName));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Books List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Id", "Title", "Operation"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((fileName, index) => (
                <tr key={index}>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {fileName}
                    </Typography>
                  </td>
                  {/* Add other table cells here */}
                  <td className="py-3 px-5 border-b border-blue-gray-50">
                    <button
                      onClick={() => handleDelete(fileName)}
                      className="px-2 py-0.5 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none inline-block"
                      style={{ fontSize: "14px", width: "fit-content" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default BooksList;
