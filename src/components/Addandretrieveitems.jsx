import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Applicationoptions from "./applicationoptions";
import { useSession } from "next-auth/react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "@/styles/util.module.css";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addandretrieveitems() {
  const { data: session, status } = useSession();
  const [inputtext, setinputtext] = useState("");
  const [usertasks, setuserTaskrecent] = useState([]);
  const [userloggedin, setloginstatus] = useState(false);
  const [counter, setcounter] = useState(0);
  const [completionDate, setCompletionDate] = useState("");

  const settingtask = (e) => {
    setinputtext(e?.target?.value);
  };

  useEffect(() => {
    if (session) {
      setloginstatus(true);
    } else {
      setloginstatus(false);
    }
  }, [session]);

  useEffect(() => {
    const gettask = async () => {
      if (userloggedin) {
        try {
          const response = await axios.get(
            `/api/gettask?useEmail=${session.user.email}&userImg=${session.user.name}&filter=false`
          );
          setuserTaskrecent(response.data.data); // Assuming response.data contains the tasks
          setcounter(response.data.data.length);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    gettask();
  }, [userloggedin, session, counter]);

  const deltetaskk = async (user, taskid, task) => {
    try {
      const deleting = await axios.post("/api/deletetask", {
        user,
        task,
        taskid,
      });
      if (deleting.status == 201) {
        toast("Your task deleted successfully 🥺");
        setcounter((prevCounter) => prevCounter - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatetaskcompletionstate = async (user, taskid, task) => {
    try {
      const updatetaskstate = await axios.post("/api/taskcomplete", {
        user,
        task,
        taskid,
      });
      if (updatetaskstate.status == 201) {
        toast("Hurray Task Completed 🥳");
        setcounter((prevCounter) => prevCounter - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const timesanitize = (e) => {
    const date = new Date(e);
    return date.toISOString().split("T")[0];
  };

  const AddingtasktoUser = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (inputtext.trim() !== "" && completionDate !== "") {
      try {
        const res = await axios.post("/api/addTask", {
          userEmail: session.user.email,
          userName: session.user.name,
          userImg: session.user.image,
          task: inputtext,
          todoCompletiontime: new Date(completionDate),
        });
        if (res.status === 201) {
          toast("Successfully added your task! 🙂");
          setinputtext("");
          setCompletionDate("");
          setcounter((prevCounter) => prevCounter + 1);
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  if (status === "loading") {
    return (
      <div
        style={{ height: "80vh" }}
        className="w-full fixed flex justify-center items-center"
      >
        <BeatLoader />
      </div>
    );
  }

  // Function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center bg-[#44446a]">
      <div>
        <ToastContainer theme="dark" />
      </div>
      <section
        style={{ height: "80vh" }}
        className="flex flex-col w-full justify-center items-center"
      >
        <h2 className="text-3xl lg:text-5xl md:text-5xl text-black font-extrabold">
          TodoList
        </h2>
        {session && session.user ? (
          <div
            className={`${styles.scrollbar} flex flex-col w-10/12 lg:w-10/12 md:w-10/12 lg:p-5 md:p-5 h-full`}
          >
            {usertasks.length > 0 ? (
              <div
                className={`${styles.scrollbar} flex flex-col items-center   gap-3 w-full h-full`}
              >
                {usertasks.map((element, index) => {
                  return (
                    <section
                      key={index}
                      className={`bg-[#130f1e] rounded text-white flex w-8/12 h-fit min-h-15`}
                    >
                      <p className="text-white ml-1 flex justify-start items-center w-10/12 full text-sm">
                        {element.task}
                      </p>
                      <span className="flex flex-col text-sm gap-2 w-2/12 justify-center items-center">
                        <span className="flex w-full justify-center gap-2 cursor-pointer">
                          <div
                            onClick={() => {
                              updatetaskcompletionstate(
                                session.user.email,
                                element._id,
                                element.task
                              );
                            }}
                            className="hover:bg-green-600"
                          >
                            <DoneOutlineIcon />
                          </div>

                          <div
                            className="cursor-pointer hover:text-red-700"
                            onClick={() => {
                              deltetaskk(
                                session.user.email,
                                element._id,
                                element.task
                              );
                            }}
                          >
                            <DeleteForeverIcon />
                          </div>
                        </span>
                        <b className="text-white w-full flex justify-center mr-2 items-center">
                          {timesanitize(element.todoCompletiontime)}
                        </b>
                      </span>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div className="h-full text-2xl flex flex-col font-extrabold w-full justify-center items-center">
                <h2>No Tasks Added!</h2>
                <img src="/ezgif-1-431eb14bf7.gif" height={100} width={100} />
              </div>
            )}
          </div>
        ) : (
          <Applicationoptions />
        )}
      </section>
      <section className="w-full focus-within:outline-none flex justify-center items-center">
        <form
          onSubmit={
            !session
              ? (e) => {
                  e.preventDefault();
                  toast("please login to add tasks");
                }
              : AddingtasktoUser
          }
          className=" bg-black rounded flex mb-10 justify-center items-center w-9/12 md:w-7/12 lg:w-7/12"
        >
          <input
            style={{ borderWidth: "0px" }}
            className="bg-black pl-2 lg:w-11/12 md:w-11/12 w-8/12 h-10 focus-within:outline-none"
            onChange={(e) => {
              settingtask(e);
            }}
            value={inputtext}
            placeholder="Add your task"
            required
          />
          <div className="cursor-pointer flex flex-col items-center justify-center bg-black">
            <input
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              className="bg-[#808080] focus-within:outline-none cursor-pointer text-black font-semibold"
              required
              min={getTodayDate()} // Ensure the date is greater than today
            />
            <button type="submit" className="bg-black cursor-pointer">
              <AddBoxIcon style={{ color: "grey", height: "40" }} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Addandretrieveitems;
