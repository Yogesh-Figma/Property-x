"use client";

import {Chip as MUIChip} from "@mui/material";

//const Chip = (props) =>< MUIChip {...props} />


const style = {
    div: {
        borderRadius: "8px",
        border: "0.5px solid #C7C7C7",
        display:"inline-flex",
        maxWidth:"100px",
        alignItems:"center",
        verticalAlign:"middle",
        padding:"0px 10px"
    }
}

const Chip = ({label}) =><div style={style.div}><span>{label}</span></div>

export default Chip;