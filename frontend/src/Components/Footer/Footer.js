import { Grid } from "@material-ui/core"
import classes from "./Footer.module.css"

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <Grid item md={12}>
            <div className={classes.Footer}>
                <p>©{year} gotem.hu - All Rights Reserved.</p>
                <p><a href="/privacy-policy">Privacy Policy</a></p>
                <p><a href="/terms-and-conditions"> Terms and Conditions</a></p>
            </div>
        </Grid>
    )
}