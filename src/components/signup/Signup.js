import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { db, auth, storage } from "../firebase/firebase";

const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
    marginTop: "50px",
  };

  const [uname, setUname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState([]);
  const addToDb = () => {
    auth.createUserWithEmailAndPassword(email, pass).then((authUser) => {
      authUser.user.updateProfile({
        displayName: uname,
        photoURL: image,
      });
      setUser(authUser);
    });

    db.collection("registration").add({
      uname: uname,
      email: email,
      image: image,
    });
    setPass("");
    setUname("");
    setemail("");
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`registration/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("registration")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setProgress(0);
            setImage(url);
          });
      }
    );
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const textfield = { marginTop: "20px" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Create an account</h2>
        </Grid>
        <TextField
          label="Name"
          style={textfield}
          value={uname}
          onChange={(e) => setUname(e.target.value)}
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
          style={textfield}
          variant="outlined"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={textfield}
          required
          variant="outlined"
        />
        <FormControlLabel
          style={textfield}
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={textfield}
          fullWidth
          onClick={addToDb}
        >
          signup
        </Button>
        <input
          type="file"
          onChange={handleChange}
          style={{ marginTop: "20px" }}
        />
        <button
          onClick={(e) => {
            handleUpload();
            e.preventDefault();
          }}
        >
          upload
        </button>
        <progress value={progress} />
        {/* <Typography style={textfield}>
          <Link href="#">Forgot password ?</Link>
        </Typography> */}
        <Typography style={textfield}>
          {" "}
          Do you have an account ?<a href="/login">Sign In</a>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Signup;
