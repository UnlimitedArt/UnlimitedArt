import React from 'react';
import Carousel from "./carousel.jsx"
import List from "./offerlist.jsx"
import axios from "axios"
class Offers extends React.Component {
    constructor(props){
        super(props)
        this.state={
            jobs:[],
            alljobs:[],
        }
        this.changeField=this.changeField.bind(this)
    }
     changeField(e){
  var filter=[]
  var field=e.target.value
  if(e.target.value=="all"){
    setTimeout(() => {
      this.setState({field:field,jobs:this.state.alljobs})
    }, 100);
  }else{
    var filter = this.state.alljobs.filter((elem)=>{
      return  elem.fields==e.target.value
      })
      setTimeout(() => {
  this.setState({field:field,jobs:filter})
}, 100);
  }

    }

    componentDidMount() {
        axios({
          url: '/api/offers',
          method: 'get',
        }).then(data => {
          this.setState({
            jobs: data.data,
            alljobs:data.data
          });
        }).catch(error => {
          console.log(error)
        });
      }
render() {
        return <div>
     <Carousel/>
     <List id="listoffers" jobs={this.state.alljobs}/>
        </div>
  }
}
export default Offers
