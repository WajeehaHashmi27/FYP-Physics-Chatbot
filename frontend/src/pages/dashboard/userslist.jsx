import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Link } from "react-router-dom";
export function Userslist() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Users List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Users", "View Chat", "Delete"].map((el) => (
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
              {authorsTableData.map(
                ({ img, name, email, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={img}
                            alt={name}
                            size="sm"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>

                      {/*  */}
                      {/* <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td> */}
                      {/* <td className={className}>
                        <Link to="/dashboard/viewchat">
                          <button
                            className="text-xs font-semibold text-white bg-green-500 hover:bg-green-600 py-0.5 px-2 rounded-md focus:outline-none inline-block"
                            style={{ fontSize: "12px", width: "fit-content" }}
                          >
                            View Chat
                          </button>
                        </Link>
                      </td> */}
                      <td className={className}>
                        <Link to="/dashboard/userslist/viewchat">
                          <button
                            className="px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none inline-block"
                            style={{ fontSize: "14px", width: "fit-content" }}
                          >
                            View Chat
                          </button>
                        </Link>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <button
                          // onClick={() => handleDelete(fileName)}
                          className="px-2 py-0.5 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none inline-block"
                          style={{ fontSize: "14px", width: "fit-content" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Userslist;
