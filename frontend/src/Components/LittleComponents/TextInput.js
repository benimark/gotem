import {TextField, ThemeProvider } from '@material-ui/core';
import React from 'react'
import {theme} from "../Theme/Theme"

export default function TextInput(props) {

    return (
        <div>
          <ThemeProvider theme={theme}>
            <TextField rows={props.rows} multiline={props.multiline} style={props.style} type={props.type} required={props.required} id={props.id} value={props.value} error={props.error} helperText={props.helperText} onChange={props.onChange} label={props.label} variant={props.variant} />
          </ThemeProvider>
        </div>
    )
}
