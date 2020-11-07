import React, { useState } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Button, Icon, Grid, useMediaQuery } from "@material-ui/core";
import { grey, blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url("/images/background.jpg")',
    width: "100vw",
    height: `${(1080 / 1920) * 100}vw`,
    maxHeight: "calc(100vh - 65px)",
    overflow: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  title: {
    textAlign: "center",
    fontFamily: "Sansita Swashed",
    fontSize: "64px",
    fontWeight: "bolder",
    color: grey[50],
    textShadow:
      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      fontSize: "48px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "32px",
    },
  },
  infos: {
    "& section": {
      padding: "20px",
    },

    "& .image": {
      textAlign: "center",
      padding: "40px",
      "& img": {
        borderRadius: "50%!important",
        width: "83%",
      },
    },
    "& .text": {
      padding: "40px",
      "& h2": {
        whiteSpace: "nowrap",
        fontFamily: "Catamaran",
        fontSize: "56px",
        fontWeight: "800!important",
        color: "#666",
        margin: "0",
        [theme.breakpoints.down("sm")]: {
          fontSize: "32px",
        },
      },
      "& p": {
        margin: "0",
        fontFamily: 'Muli-Regular',
        color: "#666",
        fontSize: "16px",
      },
    },
  },
}));

const SeeMore = withStyles((theme) => ({
  root: {
    borderRadius: "25px",
    margin: "20px",
    padding: "10px 20px",
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
    fontWeight: "bolder",
  },
}))((props) => (
  <Button
    {...props}
    variant="contained"
    color="secondary"
    endIcon={<Icon>visibility</Icon>}
  />
));
export default function Home() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const [infos, setInfos] = useState(() => [
    {
      img: { src: "img/03.jpg" },
      text: {
        title: "FreeLancers",
        detail: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
    aliquid, mollitia odio veniam sit iste esse assumenda amet
    aperiam exercitationem, ea animi blanditiis recusandae! Ratione
    voluptatum molestiae adipisci, beatae obcaecati.`,
      },
    },
    {
      img: { src: "img/02.jpg" },
      text: {
        title: "Clients",
        detail: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
    aliquid, mollitia odio veniam sit iste esse assumenda amet
    aperiam exercitationem, ea animi blanditiis recusandae! Ratione
    voluptatum molestiae adipisci, beatae obcaecati.`,
      },
    },
    {
      img: { src: "img/01.jpg" },
      text: {
        title: "Our Team",
        detail: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
    aliquid, mollitia odio veniam sit iste esse assumenda amet
    aperiam exercitationem, ea animi blanditiis recusandae! Ratione
    voluptatum molestiae adipisci, beatae obcaecati.`,
      },
    },
  ]);
  return (
    <div>
      <div className={classes.root}>
        <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <div className={classes.title}>
              <div>unlimited art</div>
              <div>First .. Platform</div>
            </div>
          </Grid>
          <Grid item>
            <SeeMore>Learn More</SeeMore>
          </Grid>
        </Grid>
      </div>
      <div className={classes.infos}>
        {infos.map((info, key) => (
          <section key={key}>
            <Grid
              direction={key % 2 == 1 && smUp ? "row-reverse" : "row"}
              container
              spacing={3}
              alignItems="center"
            >
              <Grid className="image" item xs={12} sm={6}>
                <img src={info.img.src} alt="" />
              </Grid>
              <Grid className="text" item xs={12} sm={6}>
                <h2>{info.text.title}</h2>
                <p>{info.text.detail}</p>
              </Grid>
            </Grid>
          </section>
        ))}
      </div>
    </div>
  );
}