import "./App.css";
import React from "react";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Index from "./components/index/Index";
import Profile from "./components/profile/Profile";
import { auth, db } from "./components/firebase/firebase";
import All from "./components/all/All";
import Demo from "./components/demo/Demo";
import Projects from "./components/projects/Projects";
import Projectcard from "./components/projects/Projectcard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  // const history = useHistory();
  // React.useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       history.replace("/index");
  //     }
  //   });
  // });

  const [dbData, setDbData] = React.useState([]);
  const [data, setdata] = React.useState([]);
  React.useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      setdata([authuser]);
      if (authuser) {
        db.collection("data")
          .doc(auth.currentUser.uid)
          .onSnapshot((snapshot) => {
            setDbData([snapshot.data()]);
          });
      }
    });
  }, []);
  const [alldata, setAllData] = React.useState([]);
  React.useEffect(() => {
    db.collection("registration").onSnapshot((snapshot) =>
      setAllData(
        snapshot.docs.map((data) => ({ data: data.data(), id: data.id }))
      )
    );
  }, []);

  // console.table(data);
  console.table(dbData);
  console.log(alldata);
  return (
    <Router>
      <div className="App">
        <Switch>
          {data.map((data) => {
            return (
              <Route exact path="/myprofile">
                <Profile name={data?.displayName} image={data?.photoURL} />
              </Route>
            );
          })}

          <Route exact path="/login">
            <Signin />
          </Route>
          {/* {alldata.map((data) => {
            return (
              <Route exact path="/all">
                <All
                  name={data.data.uname}
                  image={data.data.image}
                  key={data.data.id}
                />
                <All
                  name={data.data.uname}
                  image={data.data.image}
                  key={data.data.id}
                />
              </Route>
            );
          })} */}
          <Route exact path="/demo">
            <Demo />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/index">
            <Index />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>

          <Route exact path="/">
            <Signin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
