import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: props=>{console.log(props.item.imgsrc)
       return `url(${props.item.imgsrc})`
        },
        width: "100vw",
        height: `${(1080 / 1000) * 100}vw`,
        maxHeight: "calc(100vh - 65px)",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      title: {
        marginTop:"45px",
        textAlign: "center",
        fontFamily: "Syne Mono",
        fontSize: "64px",
        fontWeight: "bolder",
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
            fontFamily: "Syne Mono",
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
            fontFamily: 'Syne Mono',
            color: "#666",
            fontSize: "16px",
          },
        },
      },
    }))
function Example(props)
{
    var items = [
        {
            Title: "You can Find Music Offers",
            Title0: "Hire One",
            imgsrc:"https://w.wallhaven.cc/full/48/wallhaven-48qkzy.jpg",
            color:''
        },
        {
            Title: "test",
            Title0: "",
            imgsrc:"https://w.wallhaven.cc/full/4x/wallhaven-4xmggl.jpg",
            color:''
        },
        {
            Title: "test",
            Title0: "",
            imgsrc:"https://w.wallhaven.cc/full/lq/wallhaven-lqgvg2.jpg",
            color:''
        },
        {
            Title: "test",
            Title0: "Hire a developer",
            imgsrc:"https://w.wallhaven.cc/full/j5/wallhaven-j5op6p.png",
            color:''
        }
    ]
 
    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}
 
function Item(props)
{ const classes = useStyles(props);
    return (
      <div>
          <div className={classes.root} >
            <div className={classes.title}>
              <div >{props.item.Title}</div>
              <div >{props.item.Title0}</div>
              </div>
            </div> 
      </div>
    )
}
export default Example