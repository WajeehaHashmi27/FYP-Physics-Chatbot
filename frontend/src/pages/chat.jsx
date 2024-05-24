import React, { Fragment, useState, useEffect, useRef } from "react";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import axios from "axios";

import SyncIcon from "@mui/icons-material/Sync";
import NearMeIcon from "@mui/icons-material/NearMe";

import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import { Dialog, Transition } from "@headlessui/react";
const messages = [
  {
    id: 1,
    content: "Write a persuasive email",
  },
  {
    id: 2,
    content: "Another message goes here Write a persuasive email",
  },
  // Add more messages as needed
  {
    id: 3,
    content: "Another message goes here Write a persuasive email",
  },
  {
    id: 4,
    content:
      "Another message goes here Write a persuasive email tpppppppppppppppppppppppppppp",
  },
  {
    id: 5,
    content: "Another message goes here",
  },
  {
    id: 6,
    content: "Another message goes here",
  },
  {
    id: 7,
    content: "Another message goes here",
  },
  {
    id: 8,
    content: "Another message goes here",
  },
];

const QA = ({ chatMessages }) => (
  <div>
    {chatMessages.map((qa, index) => (
      <div key={index} className="word-break">
        <div className="relative flex xl:ml-3 m-1 ">
          <div className="relative flex h-1/2 ">
            <span className="relative flex items-center rounded-full bg-stone-200 pb-2 px-[6px] pt-1 text-neutral-900 dark:bg-zinc-900 dark:text-neutral-200">
              <PersonOutlineOutlinedIcon
                className=""
                style={{ fontSize: "24px" }}
              />
            </span>
          </div>
          <span className="flex items-center xl:px-3 px-1 font-semibold text-neutral-800 xl:text-[14px] lg:text-[14px] text-[13px] dark:text-white dark:font-normal whitespace-wrap wrap-line-custom">
            {qa.content}
          </span>
        </div>
        <div className="relative xl:mx-1 mx-1 xl:p-3 p-2 xl:mt-3 mt-2 xl:mb-3 mb-2 max-w-full bg-emerald-200 rounded-3xl shadow-sm flex flex-col items-start ">
          <div className="relative flex items-inline">
            <div className="relative flex h-1/4 word-break">
              <span className="relative flex items-center rounded-full bg-emerald-300 p-2 ">
                <AutoStoriesIcon
                  className="p-0 text-emerald-500"
                  style={{ fontSize: "22px" }}
                />
              </span>
            </div>
            <span className="xl:ml-2 ml-1 xl:text-[14px] lg:text-[14px] text-[13px] font-normal text-neutral-800 max-w-full ">
              <span className="">{qa.answer}</span>
            </span>
          </div>
          <div className="flex mt-5">
            <div className="relative flex items-center rounded-full  bg-white hover:bg-stone-100 hover:cursor-pointer p-[4px] ml-12">
              <ThumbUpOutlinedIcon
                className="text-neutral-800 hover:text-black hover:cursor-pointer"
                style={{ fontSize: "15px" }}
              />
            </div>
            <div className="relative flex items-center rounded-full ml-1 bg-white hover:bg-stone-100 hover:cursor-pointer p-[4px] ml-1">
              <ThumbDownOutlinedIcon
                className="text-neutral-800 hover:text-black hover:cursor-pointer"
                style={{ fontSize: "15px" }}
              />
            </div>
            <div className="relative flex items-center rounded-full ml-1 bg-white hover:bg-stone-100 hover:cursor-pointer p-[4px] ml-1">
              <ContentCopyOutlinedIcon
                className="text-neutral-800 hover:text-black hover:cursor-pointer"
                style={{ fontSize: "15px" }}
              />
            </div>
            {index === chatMessages.length - 1 && (
              <div className="relative flex items-center rounded-full ml-1 bg-white hover:bg-stone-100 hover:cursor-pointer p-[4px] ml-1">
                <SyncIcon
                  className="text-neutral-800 hover:text-black hover:cursor-pointer"
                  style={{ fontSize: "15px" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const MessageComponent = ({ message }) => (
  <div
    key={message.id}
    className="relative xl:mx-3 mx-2 xl:p-3 p-2 xl:mt-4 mt-3 mb-2 max-w-sm bg-emerald-200 rounded-full shadow-sm flex items-center hover:bg-emerald-200 hover:cursor-pointer"
  >
    <span className="relative flex items-center rounded-full bg-white dark:bg-neutral-300 p-2">
      <ForumOutlinedIcon
        className="p-0 text-neutral-900"
        style={{ fontSize: "18px" }}
      />
    </span>
    <span className="block xl:ml-2 lg:ml-2 ml-1 xl:text-[13px] lg:text-[13px] text-[12px] overflow-hidden font-normal text-neutral-800 w-[183px]">
      <span className="truncate-2-lines">{message.content}</span>
    </span>
  </div>
);

const MessageList = () => (
  <div>
    {messages.map((msg) => (
      <MessageComponent key={msg.id} message={msg} />
    ))}
  </div>
);

const Chat = () => {
  const topBarRef = useRef();
  const bottomBarRef = useRef();
  const chatParentRef = useRef();

  const [showMenu, setShowMenu] = useState(true); // Initially showing the sidebar

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to check the screen width
  const isMediumScreen = () => {
    return window.innerWidth < 768; // Change this value as needed for your medium screen size
  };

  // Effect to update showMenu state on window resize
  useEffect(() => {
    const handleResize = () => {
      if (isMediumScreen()) {
        setShowMenu(false); // Hide sidebar on medium screens
      } else {
        setShowMenu(true); // Show sidebar on larger screens
      }
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  var width = window.innerWidth;
  var height = window.innerHeight;
  var totalpixels = width * height;
  console.log(width, height, totalpixels);

  const [darkMode, setDarkMode] = useState(false);
  const toggleDrakMode = () => {
    setDarkMode(!darkMode);
  };
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // const handleSend = () => {
  //   if (inputValue.trim() !== "") {
  //     const params = new URLSearchParams({ question: inputValue });
  //     axios
  //       .post(`http://localhost:8000/ask?${params.toString()}`)
  //       .then((response) => {
  //         console.log(response.data.answer.content);
  //         // Extract the answer from the response
  //         const dynamicAnswer = response.data.answer.content;

  //         const newQuestion = {
  //           id: chatMessages.length + 1,
  //           content: inputValue,
  //           answer: dynamicAnswer,
  //         };

  //         setChatMessages((prevMessages) => [...prevMessages, newQuestion]);
  //         setInputValue("");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     alert("Do not send Empty String");
  //   }
  // };

  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      setLoading(true); // Set loading state to true
      setInputValue("Loading..."); // Set loading text in the input box

      const params = new URLSearchParams({ question: inputValue });
      axios
        .post(`http://localhost:8000/ask?${params.toString()}`)
        .then((response) => {
          console.log(response.data.answer);
          const dynamicAnswer = response.data.answer;
          const newQuestion = {
            id: chatMessages.length + 1,
            content: inputValue,
            answer: dynamicAnswer,
          };
          setChatMessages((prevMessages) => [...prevMessages, newQuestion]);
          setInputValue(""); // Reset the input value
        })
        .catch((error) => {
          console.log(error);
          setInputValue(""); // Reset the input value in case of an error
        })
        .finally(() => {
          setLoading(false); // Reset loading state to false, regardless of success or error
        });
    } else {
      alert("Do not send an empty string");
    }
  };

  // const handleSend = async () => {
  //   if (inputValue.trim() === "") {
  //     return;
  //   }

  //   try {
  //     // Make a POST request to the FastAPI backend
  //     const response = await axios.post("http://localhost:8000/ask", {
  //       question: inputValue,
  //     });

  //     // Extract the answer from the response
  //     const dynamicAnswer = response.data.answer;

  //     const newQuestion = {
  //       id: chatMessages.length + 1,
  //       content: inputValue,
  //       answer: dynamicAnswer,
  //     };

  //     setChatMessages((prevMessages) => [...prevMessages, newQuestion]);
  //     setInputValue("");
  //   } catch (error) {
  //     console.error("Error sending request to backend:", error);
  //   }
  // };

  const handleNewChatClick = () => {
    // Clear the chat messages array
    setChatMessages([]);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div
      className={` ${
        darkMode && "dark"
      } relative z-0 flex h-screen w-screen bg-neutral-100 `}
    >
      <div className="relative flex h-full max-w-full w-screen flex-1 flex-col bg-neutral-100 dark:bg-zinc-900 transition-all duration-200 ease-in-out">
        <div
          ref={chatParentRef}
          className="relative max-w-full xl:mx-7 lg:mx-7 ml-5 mr-4 mt-7 mb-4 bg-white shadow-lg overflow-x-auto flex-1 rounded-[40px] dark:bg-zinc-700"
        >
          <div
            ref={topBarRef}
            className="relative border-b-2 px-2 py-3 sticky top-0 bg-white z-10 dark:bg-zinc-700 dark:border-black"
          >
            <div className="inline-flex items-center">
              <span className="ml-2 font-bold text-neutral-800 text-[20px] dark:text-white ">
                Chat
              </span>
            </div>
          </div>
          <div className="relative flex h-full flex-1 flex-col max-w-full px-2 mb-2 mt-2 ">
            <div className="max-h-[100vh] overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="relative flex flex-col items-center justify-center mt-10">
                  <div className="mb-3 h-[72px] w-[72px]">
                    <div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white text-black">
                      <span className="relative flex items-center rounded-full bg-emerald-300">
                        <img
                          src="physics.png"
                          alt="Physics"
                          className="p-0  h-28"
                        />
                      </span>
                    </div>
                  </div>
                  <div class="mb-5 text-[20px] font-medium lg:text-[23px] xl:text-[26px] dark:text-white">
                    Ask anything about Physics?
                  </div>
                </div>
              ) : (
                <QA chatMessages={chatMessages} />
              )}
            </div>
          </div>
          <div ref={bottomBarRef} className="sticky max-w-full bottom-0 z-10">
            <div className="px-4 flex items-center bg-white py-4 dark:bg-zinc-700 dark:text-black">
              <input
                type="text"
                placeholder="Enter your query here"
                className="flex-1 rounded-md px-4 py-2  bg-gray-100 border mr-2 border-gray-300  dark:bg-zinc-700 dark:border-zinc-900 dark:text-white focus:outline-none placeholder-gray-600 dark:placeholder-gray-300"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading} // Disable input when loading
              />
              <button
                type="button"
                onClick={handleSend}
                className={`relative right ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading} // Disable button when loading
              >
                <span
                  className={`relative flex items-center rounded-full bg-zinc-800 hover:bg-black dark:bg-neutral-200 ${
                    loading ? "opacity-50 cursor-not-allowed " : ""
                  }`}
                  disabled={loading}
                >
                  <NearMeIcon
                    className={`text-white m-2 dark:text-zinc-800 ${
                      loading ? "opacity-50 cursor-not-allowed " : ""
                    }`}
                    disabled={loading}
                    style={{ fontSize: "19px" }}
                  />
                </span>
              </button>
            </div>
          </div>
          <style jsx>
            {`
              /* Scrollbar Styles */
              ::-webkit-scrollbar {
                width: 7px; /* Width of the scrollbar */
              }

              /* Track styles */
              ::-webkit-scrollbar-track {
                border-radius: 15px; /* Rounded corners */
                margin-right: 10px;
              }

              /* Handle styles */
              ::-webkit-scrollbar-thumb {
                background: #ccc; /* Color of the scrollbar */
                border-radius: 15px; /* Rounded corners */
              }

              /* Dark mode styles */
              .dark .custom-scrollbar {
                scrollbar-color: black transparent !important; /* Color of the scrollbar in dark mode */
              }

              .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                background: black !important; /* Color of the scrollbar handle in dark mode */
              }
            `}
          </style>
        </div>

        <button
          type="button"
          className="sm:hidden absolute top-2 right-2 cursor-pointer dark:text-white text-zinc-700"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 sm:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80 justify-end" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-16 flex flex-1 justify-end">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-full top-0 flex w-16  pt-5">
                    <button
                      type="button"
                      className="-m-0 p-0 relative z-50"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <CloseSharpIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div
                  className={`${
                    darkMode ? "dark" : ""
                  }  flex flex-col flex-shrink-0 overflow-x-hidden dark:bg-zinc-900 bg-neutral-100`}
                >
                  {/* Your menu content */}

                  <div className="relative p-2 mt-4 mb-2 max-w-sm mx-auto bg-white rounded-3xl shadow-lg flex items-center xl:w-[300px] lg:w-[250px] w-[220px] dark:bg-zinc-700">
                    <div className="relative flex items-center rounded-full bg-stone-200 dark:bg-zinc-900 ">
                      <span className="pb-1 px-1 text-neutral-900 dark:text-neutral-200">
                        <PersonOutlineOutlinedIcon
                          className=""
                          style={{ fontSize: "20px" }}
                        />
                      </span>
                    </div>
                    <span className="flex flex-nowrap xl:pl-2 lg:pl-2 pl-1 overflow-hidden whitespace-nowrap font-bold text-zinc-800 xl:text-[14px] lg:text-[14px] text-[12px] xl:w-[200px] lg:w-[190px] w-[130px] dark:text-white">
                      Wajeeha Hashmi
                    </span>
                    <span className="relative flex items-center rounded-full bg-stone-200 hover:bg-stone-300 hover:cursor-pointer p-[2px] dark:bg-zinc-900 ">
                      <NotificationsNoneOutlinedIcon
                        className="px-1 text-neutral-900 dark:text-neutral-200"
                        style={{ fontSize: "26px" }}
                      />
                    </span>
                    <span
                      className="relative flex items-center rounded-full ml-1 bg-stone-200 hover:bg-stone-300 hover:cursor-pointer p-[4px] dark:bg-zinc-900 "
                      onClick={toggleDrakMode}
                    >
                      <DarkModeSharpIcon
                        className="px-1 text-neutral-900 dark:text-neutral-200"
                        style={{ fontSize: "22px" }}
                      />
                    </span>
                  </div>
                  <div className="relative lg:p-2 xl:p-2 p-1 lg:mx-7 xl:mx-7 mx-7 mt-2 mb-0 bg-white shadow-lg overflow-y-auto overflow-x-hidden flex-1 rounded-[40px] xl:w-[300px] lg:w-[250px] w-[220px] dark:bg-zinc-700">
                    <div
                      className="relative xl:mx-3 mx-2 xl:p-3 lg:p-3 p-2 xl:mt-4 lg:mt-2 mt-3 xl:mb-2 mb-1 max-w-sm bg-zinc-800 rounded-2xl shadow-sm flex items-center hover:bg-black hover:cursor-pointer dark:bg-neutral-300"
                      onClick={handleNewChatClick}
                    >
                      <span className="xl:ml-2 lg:ml-2 ml-1 xl:text-md lg:text-md text-[15px] font-semibold text-white dark:text-zinc-800">
                        New Chat
                      </span>
                    </div>
                    <MessageList />
                    <style jsx>
                      {`
                        /* Scrollbar Styles */
                        ::-webkit-scrollbar {
                          width: 7px; /* Width of the scrollbar */
                        }

                        /* Track styles */
                        ::-webkit-scrollbar-track {
                          border-radius: 15px; /* Rounded corners */
                          margin-right: 10px;
                        }

                        /* Handle styles */
                        ::-webkit-scrollbar-thumb {
                          background: #ccc; /* Color of the scrollbar */
                          border-radius: 15px; /* Rounded corners */
                        }

                        /* Dark mode styles */
                        .dark .custom-scrollbar {
                          scrollbar-color: black transparent !important; /* Color of the scrollbar in dark mode */
                        }

                        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                          background: black !important; /* Color of the scrollbar handle in dark mode */
                        }
                      `}
                    </style>
                  </div>

                  <div className="relative p-2 mt-4 mb-4 max-w-sm mx-auto bg-emerald-400 rounded-3xl shadow-lg flex items-center hover:bg-emerald-400 hover:cursor-pointer xl:w-[300px] lg:w-[250px] w-[220px]">
                    <span className="circle4">
                      <LogoutOutlinedIcon
                        className="ml-1 text-neutral-900"
                        style={{ fontSize: "18px" }}
                      />
                    </span>
                    <span className="flex flex-nowrap pl-1 md:text-[16px] xl:text-[16px] text-[15px] overflow-hidden whitespace-nowrap font-semibold text-neutral-900">
                      Logout
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {!showMenu && (
        <MenuIcon
          className="hidden absolute top-2 right-2 cursor-pointer dark:text-white text-zinc-700"
          onClick={toggleMenu}
        />
      )}
      <div
        className={`hidden dark:bg-zinc-900 sm:flex flex-col flex-shrink-0 overflow-x-hidden bg-neutral-100 ${
          showMenu
            ? "xl:w-[355px] lg:w-[300px] w-[270px] transition-all duration-200 ease-in-out"
            : "w-0 xl:w-0 lg:0 transition-all duration-200 ease-in-out"
        }`}
      >
        {/* Your menu content */}

        <ArrowBackIosNewIcon
          className="relative left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-zinc-800 dark:text-white"
          onClick={toggleMenu}
        />

        <div className="relative p-2 mt-0 mb-2 max-w-sm mx-auto bg-white rounded-3xl shadow-lg flex items-center xl:w-[300px] lg:w-[250px] w-[220px] dark:bg-zinc-700">
          <div className="relative flex items-center rounded-full bg-stone-200 dark:bg-zinc-900 ">
            <span className="pb-1 px-1 text-neutral-900 dark:text-neutral-200">
              <PersonOutlineOutlinedIcon
                className=""
                style={{ fontSize: "20px" }}
              />
            </span>
          </div>
          <span className="flex flex-nowrap xl:pl-2 lg:pl-2 pl-1 overflow-hidden whitespace-nowrap font-bold text-zinc-800 xl:text-[14px] lg:text-[14px] text-[12px] xl:w-[200px] lg:w-[190px] w-[130px] dark:text-white">
            Wajeeha Hashmi
          </span>
          <span className="relative flex items-center rounded-full bg-stone-200 hover:bg-stone-300 hover:cursor-pointer p-[2px] dark:bg-zinc-900 ">
            <NotificationsNoneOutlinedIcon
              className="px-1 text-neutral-900 dark:text-neutral-200"
              style={{ fontSize: "26px" }}
            />
          </span>
          <span
            className="relative flex items-center rounded-full ml-1 bg-stone-200 hover:bg-stone-300 hover:cursor-pointer p-[4px] dark:bg-zinc-900 "
            onClick={toggleDrakMode}
          >
            <DarkModeSharpIcon
              className="px-1 text-neutral-900 dark:text-neutral-200"
              style={{ fontSize: "22px" }}
            />
          </span>
        </div>
        <div className="relative lg:p-2 xl:p-2 p-1 lg:mx-7 xl:mx-7 mx-7 mt-2 mb-0 bg-white shadow-lg overflow-y-auto overflow-x-hidden flex-1 rounded-[40px] xl:w-[300px] lg:w-[250px] w-[220px] dark:bg-zinc-700">
          <div
            className="relative xl:mx-3 mx-2 xl:p-3 lg:p-3 p-2 xl:mt-4 lg:mt-2 mt-3 xl:mb-2 mb-1 max-w-sm bg-zinc-800 rounded-2xl shadow-sm flex items-center hover:bg-black hover:cursor-pointer dark:bg-neutral-300"
            onClick={handleNewChatClick}
          >
            <span className="xl:ml-2 lg:ml-2 ml-1 xl:text-md lg:text-md text-[15px] font-semibold text-white dark:text-zinc-800">
              New Chat
            </span>
          </div>
          <MessageList />
        </div>

        <div className="relative p-2 mt-4 mb-4 max-w-sm mx-auto bg-emerald-400 rounded-3xl shadow-lg flex items-center hover:bg-emerald-400 hover:cursor-pointer xl:w-[300px] lg:w-[250px] w-[220px]">
          <span className="circle4">
            <LogoutOutlinedIcon
              className="ml-1 text-neutral-900"
              style={{ fontSize: "18px" }}
            />
          </span>
          <span className="flex flex-nowrap pl-1 md:text-[16px] xl:text-[16px] text-[15px] overflow-hidden whitespace-nowrap font-semibold text-neutral-900">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
export default Chat;
