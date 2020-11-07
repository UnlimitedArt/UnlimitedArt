import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  


class SelectState extends React.Component {
    constructor(props){
        super(props)
        this.state={
            open:false,
            state:""
        }
this.handleChange=this.handleChange.bind(this)
    }
    handleChange (e){
 const state = e.target.value;
 this.props.state(state)
 this.setState({state})
    }
render() {
    
    return (
<div>
<FormControl style={{minWidth:"120"}}>
        <InputLabel htmlFor="age-native-simple">State</InputLabel>
        <Select
          native
          onChange={this.handleChange}
          inputProps={{
            name: 'State',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"Ariana"}>Ariana</option>
          <option value={'beja'}>beja</option>
          <option value={'ben arous'}>ben arous</option>
          <option value={'bizert'}>bizert</option>
          <option value={'Gabes'}>Gabes</option>
          <option value={'Gafsa'}>Gafsa</option>
          <option value={'Jendouba'}>Jendouba</option>
          <option value={'Kairouan'}>Kairouan</option>
          <option value={'Kasserine'}>Kasserine</option>
          <option value={'Kebili'}>Kebili</option>
          <option value={'Kef'}>Kef</option>
          <option value={'Mahdia'}>Mahdia</option>
          <option value={"Manouba"}>Manouba</option>
          <option value={'Medenine'}>Medenine</option>
          <option value={'Monastir'}>Monastir</option>
          <option value={'Nabeul'}>Nabeul</option>
          <option value={'Sfax'}>Sfax</option>
          <option value={'Sidi Bouzid'}>Sidi Bouzid</option>
          <option value={'Siliana'}>Siliana</option>
          <option value={'Sousse'}>Sousse</option>
          <option value={'Tataouine'}>Tataouine</option>
          <option value={'Tozeur'}>Tozeur</option>
          <option value={'Tunis'}>Tunis</option>
          <option value={"Zaghouan"}>Zaghouan</option>
        </Select>
      </FormControl>
        </div>
        
    
      );
  }
}
// const classes = useStyles();
export default  SelectState