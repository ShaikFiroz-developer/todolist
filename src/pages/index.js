import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Sidenavigation from "@/components/sidenavigation";
import HistoryIcon from "@mui/icons-material/History";
import { useEffect, useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Addandretrieveitems from "@/components/Addandretrieveitems";
import axios from "axios";
import { useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const [navside, setsidenavopen] = useState(false);
  const [completedtasksdata, setcompletedtaskdata] = useState([]);
  const [userloggedin, setloginstatus] = useState(false);
  const [counter, setcounter] = useState(0);

  useEffect(() => {
    if (session) {
      setloginstatus(true);
    } else {
      setloginstatus(false);
    }
  }, [session]);

  useEffect(() => {
    const gettask = async () => {
      if (userloggedin && session) {
        try {
          const response = await axios.get(
            `/api/gettask?useEmail=${session.user.email}&userImg=${session.user.image}&filter=true`
          );
          setcompletedtaskdata(response.data.data); // Assuming response.data contains the tasks
          setcounter(response.data.data.length);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    // Trigger task fetching once session is available
    gettask();
  }, [navside, userloggedin, session]);

  return (
    <main className={`w-full min-h-screen flex text-white`}>
      <div className="w-full h-full">
        <Navbar />
        <section style={{ height: "93vh", width: "100vw" }} className="flex">
          <div className="bg-transparent w-fit fixed flex flex-col">
            {!navside && (
              <div
                onClick={() => {
                  setsidenavopen(!navside);
                }}
              >
                <div className="cursor-pointer text-white font-extrabold">
                  <MenuIcon />
                </div>
              </div>
            )}

            {navside && (
              <Sidenavigation
                opennav={() => {
                  return completedtasksdata;
                }}
                setnavside={(e) => {
                  setsidenavopen(e);
                }}
              />
            )}
          </div>
          <div className="w-full">
            <Addandretrieveitems />
          </div>
        </section>
      </div>
    </main>
  );
}
