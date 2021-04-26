import React from 'react'
import {CircularProgress} from "@material-ui/core"
import "./loading.css"

export default function Loading() {
    return (
        <div className="loadingDiv">
            <CircularProgress className="loading" />
        </div>
    )
}
