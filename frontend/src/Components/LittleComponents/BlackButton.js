import React from 'react'
import classes from "./BlackButton.module.css"
import {Button} from "@material-ui/core"

export default function BlackButton(props) {
    return (
        <Button id={props.id} onClick={props.onclick} disabled={props.disabled} style={props.style} className={[classes.BlackButton,props.className].join(" ")}>{props.children}</Button>
    )
}
