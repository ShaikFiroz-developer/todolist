import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "@/styles/util.module.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

function Sidenavigation({ opennav, setnavside }) {
  const { data: session } = useSession();
  const [getdataofcompleted, setcompleteddata] = useState([]);
  const [baropen, setbaropen] = useState(false);

  useEffect(() => {
    setcompleteddata(opennav);
  }, [opennav]);

  const datetimeformatter = (e) => {
    const date = new Date(e);
    return date.toISOString().split("T")[0];
  };

  return (
    <section className="w-56 h-full bg-black text-white">
      <section
        style={{ height: "92vh", zIndex: "10000" }}
        className="w-full flex flex-col justify-center"
      >
        <div
          onClick={() => {
            setnavside(false);
          }}
          className="w-full  flex justify-end cursor-pointer "
        >
          <div style={{ marginRight: "-10px" }}>
            <MenuOpenIcon />
          </div>
        </div>
        <div className="flex justify-between">
          <b>Completed Task</b>
          <b>createdAt</b>
        </div>
        {getdataofcompleted && getdataofcompleted.length > 0 ? (
          <div
            className={`${styles.scrollbar} flex w-full flex-col h-full gap-3`}
          >
            {getdataofcompleted.map((element, index) => {
              return (
                <div
                  key={index}
                  className="flex  justify-between text-white items-center bg-[#22272b] p-2"
                >
                  <p className="overflow-x-hidden w-3/5">{element.task}</p>
                  <span className="font-semibold text-xs">
                    <b>{datetimeformatter(element.createdAt)}</b>
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full w-full bg-black text-white flex flex-col justify-center items-center">
            <h2 className="text-white">History of completed tasks</h2>
            {!session && <h2 className="text-blue-600">Please Login!!!</h2>}
          </div>
        )}
      </section>
    </section>
  );
}

export default Sidenavigation;
