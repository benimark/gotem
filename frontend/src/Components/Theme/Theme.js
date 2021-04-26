import {createMuiTheme} from "@material-ui/core"

export const theme = createMuiTheme({
    palette:{
        primary:{
            main: "#030303"
        }
    },
    typography:{
        fontFamily:"Raleway"
    },
    overrides:{
        MuiBottomNavigationAction:{
            root:{
               color:"rgb(29,29,29)",
               "&$selected":{
                color:"rgb(29,29,29)"
            }
            },
            label:{
                fontFamily:"font-family: 'Raleway', sans-serif;",
                fontWeight:"500"
            }
        }
    }
    
})