import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import { db, storage, auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default function SignIn() {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [url, seturl] = useState("");
  const [description, setDespriction] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  const history = useHistory();
  React.useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        history.push("/index");
      }
    });
  });

  const addToDatabase = () => {
    const id = uuid();
    db.collection("data")
      .doc(auth.currentUser.uid)
      .collection("project")
      // .doc(id)
      .set({
        url: url,
        uid: auth.currentUser.uid,
        image: image,
        description: description,
        projectTitle: projectTitle,
      });
    seturl("");
    setDespriction("");
    setProjectTitle("");
    // setImage(null);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`data/${image.name}`).put(image);

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
          .ref("data")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setProgress(0);
            setImage(url);
            console.log(url);
          });
      }
    );
  };

  const signout = (e) => {
    e.preventDefault();
    auth.signOut();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Project Details
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="project_title"
            label="Project Title"
            name="Project title"
            autoFocus
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="url"
            label="URL"
            type="url"
            id="url"
            value={url}
            onChange={(e) => seturl(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDespriction(e.target.value)}
          />
          <input
            type="file"
            onChange={handleChange}
            style={{ marginTop: "20px" }}
          />
          <Button
            onClick={(e) => {
              handleUpload();
              e.preventDefault();
            }}
            style={{ backgroundColor: "black", color: "whitesmoke" }}
          >
            UPLOAD
          </Button>
          <progress value={progress} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              addToDatabase();
            }}
          >
            Submit
          </Button>
          {/* <button onClick={signout}>signout</button> */}
          <a href="/demo" style={{ textDecoration: "none" }}>
            Click me to view fellow members
          </a>
          <Link to="/projects">
            <button>Projects</button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
