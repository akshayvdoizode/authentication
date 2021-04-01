import React from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
// import Democard from "./Democard";
import Projectcard from "./Projectcard";
const Members = (props) => {
  const [project, setProjects] = React.useState(3);
  const [data, setData] = React.useState([]);
  const [state1, setstate1] = React.useState([]);
  React.useEffect(() => {
    db.collection("data")
      // .doc(auth.currentUser.uid)
      // .collection("project")
      .onSnapshot((snapshot) =>
        // setData(snapshot.docs.map((doc) => data: doc.data()))
        setData(snapshot.docs.map((doc) => ({ dataa: doc.data(), id: doc.id })))
      );
    db.collection("data")
      .doc(auth.currentUser.uid)
      .collection("project")
      .onSnapshot((snapshot) =>
        setstate1(snapshot.docs.map((doc) => state1.doc.data()))
      );
  }, []);
  console.log(data);
  console.log(props);
  return (
    <div className="dde">
      <h5>My Projects</h5>
      <div className="members">
        {data.slice(0, project).map((id) => {
          return (
            <div className="data">
              <div className="demo">
                <Link to="/projects:id">
                  <Projectcard
                    name={id.dataa.description}
                    image={id.dataa.image}
                  />
                </Link>
              </div>
            </div>
          );
        })}
        );
      </div>
    </div>
  );
};
export default withRouter(Members);
