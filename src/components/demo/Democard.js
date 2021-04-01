import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
// import "./MemberCard.css";
export default function RecipeReviewCard({ image, name }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} />
      <CardHeader
      // avatar={<Avatar className={classes.avatar}></Avatar>}
      // title={title}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <a> {name}</a>
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing></CardActions> */}
    </Card>
  );
}
