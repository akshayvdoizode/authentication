import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      //   maxWidth: 345,
      width: "70%",
      marginLeft: "100px",
      marginRight: "100px",
      marginTop: "25px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
      padding: "10px", // 16:9
    },

    avatar: {
      textAlign: "center",
      width: "50px",
      height: "50px",
    },
    btn: {},
  })
);
export default useStyles;
