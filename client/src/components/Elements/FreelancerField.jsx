import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      field: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const field = e.target.value;
    //  this.props.field(field)
    this.setState({ field });
  }

  render() {
    return (
      <div>
        <FormControl style={{ minWidth: "120" }}>
          <InputLabel htmlFor="age-native-simple">Field</InputLabel>

          <Select
            native
            onChange={this.handleChange}
            inputProps={{ name: "field", id: "age-native-simple" }}
          >
            <option aria-label="None" value="" />
            <option value={"photography"}>photography</option>
            <option value={"designe"}>Design</option>
            <option value={30}>Photography</option>
            <option value={10}>Audio</option>
            <option value={20}>Djing</option>
            <option value={30}>Tatooage</option>
            <option value={10}>Painting</option>
            <option value={20}>Band</option>
            <option value={30}>Music Production</option>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default SelectField;
