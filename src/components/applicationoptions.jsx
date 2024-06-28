import React from "react";
import style from "@/styles/compnents.module.css";
import { signIn } from "next-auth/react";

const sa = process.env.NEXT_PUBLIC_API_URL;

function Applicationoptions(props) {
  const handlesignup = (e) => {
    props.handleRequestedSignup(e);
  };

  return (
    <div>
      <div className={style.displaypromotiondivsovterdiv}>
        <div>
          <div className={style.displaccardpromotion}>
            <p
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontFamily: "cursive",
              }}
            >
              Easy Signup! High Security
            </p>
            <p
              style={{
                color: "ffffff",
                fontWeight: "300",
                fontFamily: "serif",
              }}
            >
              singup to enjoy the TodoList service.{" "}
              <b onClick={() => signIn("google")} style={{ color: "blue" }}>
                click ME
              </b>{" "}
              to navigate to signup
            </p>
          </div>
        </div>
        <div>
          <div className={style.displaccardpromotion}>
            <p
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontFamily: "cursive",
              }}
            >
              High Availability Todo task
            </p>
            <p
              style={{
                color: "ffffff",
                fontWeight: "300",
                fontFamily: "serif",
              }}
            >
              the dodo list is available to you every time you want it.
            </p>
          </div>
        </div>
        {/* Repeat the structure for other cards */}
        <div>
          <div className={style.displaccardpromotion}>
            <p
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontFamily: "cursive",
              }}
            >
              Add and Update Tasks in no time
            </p>
            <p
              style={{
                color: "ffffff",
                fontWeight: "300",
                fontFamily: "serif",
                height: "fit-content",
              }}
            >
              Tasks are filtered date-wise. You can check your Completed tasks.
            </p>
          </div>
        </div>
        <div>
          <div className={style.displaccardpromotion}>
            <p
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontFamily: "cursive",
              }}
            >
              Login Now..!
            </p>
            <p
              style={{
                color: "ffffff",
                fontWeight: "300",
                fontFamily: "serif",
              }}
            >
              if you have an account{" "}
              <b onClick={() => signIn("google")} style={{ color: "blue" }}>
                click here
              </b>
              to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicationoptions;
