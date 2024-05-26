import React, { useEffect } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { conversationsData } from "../../data/conversations-data"; // Import conversationsData
import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  // Footer, // Commenting out the import of Footer
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
const ViewChat = () => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  useEffect(() => {
    console.log("Dashboard - MaterialTailwindController:", controller);
  }, [controller]);
  // Merge conversations for each email
  const mergedConversations = conversationsData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.email === curr.email);
    if (existing) {
      existing.conversations = existing.conversations.concat(
        curr.conversations
      );
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Chats Information
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["User", "Question", "Answer", "Accuracy"].map((el) => (
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
                  {mergedConversations.map((user, index) => (
                    <tr key={index} className="border-b border-blue-gray-200">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue"
                              className="text-[13px]"
                            >
                              {user.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <Typography
                          variant="small"
                          className="text-[13px] font-normal"
                        >
                          {user.conversations.map((conversation, convIndex) => (
                            <React.Fragment key={convIndex}>
                              {conversation.question}
                              {convIndex !== user.conversations.length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography
                          variant="small"
                          className="text-[13px] font-normal"
                        >
                          {user.conversations.map((conversation, convIndex) => (
                            <React.Fragment key={convIndex}>
                              {conversation.answer}
                              {convIndex !== user.conversations.length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                        </Typography>
                      </td>
                      <td className="py-3 px-5">
                        <Typography
                          variant="small"
                          className="text-[13px] font-semibold"
                          style={{ color: "#4CAF50" }}
                        >
                          {user.conversations.map((conversation, convIndex) => (
                            <React.Fragment key={convIndex}>
                              {conversation.accuracy}
                              {convIndex !== user.conversations.length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        {/* <div className="text-blue-gray-600">
        <Footer /> // Commenting out the rendering of Footer
      </div> */}
      </div>
    </div>
  );
};

export default ViewChat;
