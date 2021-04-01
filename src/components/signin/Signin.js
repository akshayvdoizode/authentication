import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import "./signup.css";
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
import { auth } from "../firebase/firebase";

const Signup = () => {
  const history = useHistory();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
    marginTop: "50px",
  };
  const textfield = { marginTop: "20px" };
  // const btnstyle = { margin: "8px 0", marginTop: "50px" };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const signin = () => {
    auth.signInWithEmailAndPassword(email, pass).then((user) => {
      if (user) {
        console.log(user);
        history.push("/index");
      }
    });
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Login to your account</h2>
        </Grid>
        <TextField
          label="email"
          type="email"
          style={textfield}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          variant="outlined"
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={textfield}
          required
          variant="outlined"
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
          style={textfield}
        />
        <br />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={signin}
          style={textfield}
          fullWidth
        >
          Login
        </Button>
        <br />
        <Typography style={textfield}>
          <Link to="/Signup">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ? <a href="/signup"> Sign up</a>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Signup;
