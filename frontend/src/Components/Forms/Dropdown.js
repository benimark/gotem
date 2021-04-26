import React, { useEffect, useState } from 'react';
import "./Dropdown.css"
import { useMinimalSelectStyles } from '@mui-treasury/styles/select/minimal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Dropdown = (props) => {
  const min = Math.min(...props.sizes)
  const [size,setSize] = useState(min);
  const [price,setPrice] = useState(props.entries[1][1][size])

  const handleChange = (event) => {
    setSize(event.target.value)
  };

  useEffect(() => {
    const fetchSize = () =>{
      const sizeIndex = props.entries[0][1].findIndex(entry => entry===size)
      setPrice(props.entries[1][1][sizeIndex])
    }
    fetchSize()
  }, [size,props.entries,price])

  const minimalSelectClasses = useMinimalSelectStyles();

  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon className={props.className + " " + minimalSelectClasses.icon}/>
    )};

  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list
    },
    anchorOrigin: {
      vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null
  };

  return (
    <FormControl>
      <Select id="dropDown"
        disableUnderline
        classes={{ root: minimalSelectClasses.select }}
        MenuProps={menuProps}
        IconComponent={iconComponent}
        value={size}
        onChange={handleChange}
      >
          {props.sizes.map((size,i) => <MenuItem key={size+i} value={size}>{size}</MenuItem>)}

      </Select>
      <h2 className="cardprice">${price+""}</h2>
    </FormControl>
  );
};


export default Dropdown;