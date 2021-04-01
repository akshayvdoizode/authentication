import React from "react";
import { db } from "../firebase/firebase";

const Members = () => {
  const [dataLine, setDataLine] = React.useState(3);
  const [data, setdata] = React.useState([]);
  React.useEffect(() => {
    db.collection("registration").onSnapshot((snapshot) =>
      setdata(snapshot.docs.map((doc) => ({ dataa: doc.data(), id: doc.id })))
    );
  }, []);
  console.log(data);
  return (
    <div>
      <p>a</p>
    </div>
  );
};

export default Members;
