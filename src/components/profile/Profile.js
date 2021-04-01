import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import "./profile.css";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    maxWidth: 50,
    justifyContent: "center",
    marginLeft: "200",
    display: "flex",
  },
  media: {
    height: 100,
  },
});

export default function MediaCard({ image, name }) {
  const classes = useStyles();
  const text = { textAlign: "center" };
  console.log(name, image);

  return (
    <div className="div">
      <Card className="root">
        <CardActionArea>
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <a>
              <Typography gutterBottom variant="h5" component="h2" style={text}>
                {name}
              </Typography>
            </a>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
