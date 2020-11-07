import React from "react"

     //////Client/////

import ClientSignup from "./Client/ClientSignup.jsx"
 
    //////FreeLancer/////

import FreelancerSignup from "./Freelancer/FreeLancerSignup.jsx"      

      ///////////Routes///////////

import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
} from "react-router-dom";

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
render() {
        return <div>
           <Switch>
            <Route path="/ClientSignup"  component={ClientSignup}/>
            <Route path="/FreeLancerSignup"  component={FreelancerSignup}/>
            </Switch>
        </div>
  }
}
export default Signup

