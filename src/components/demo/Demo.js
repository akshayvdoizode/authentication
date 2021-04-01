import React from "react";
import { db } from "../firebase/firebase";
import Democard from "./Democard";
import "./demo.css";
const Members = (props) => {
  const [dataLine, setDataLine] = React.useState(3);
  const [data, setdata] = React.useState([]);
  const [id, setID] = React.useState([]);
  React.useEffect(() => {
    db.collection("registration").onSnapshot((snapshot) =>
      setdata(snapshot.docs.map((doc) => ({ dataa: doc.data(), id: doc.id })))
    );
  }, []);
  console.log(data.length);
  console.log(id);
  return (
    <div className="demo1">
      <h1>Student Profile</h1>
      {data.slice(0, dataLine).map((id) => {
        return (
          <div className="demo" onClick={() => props.history.push("/projects")}>
            <a href="/projects">
              <div className="abc">
                <Democard
                  name={id.dataa.uname}
                  image={id.dataa.image}
                  key={id.dataa.id}
                />
              </div>
            </a>
          </div>
        );
      })}
      <button
        className="pulse"
        onClick={() => {
          setDataLine(dataLine + 3);
        }}
      >
        View More
      </button>
    </div>
  );
};

export default Members;
