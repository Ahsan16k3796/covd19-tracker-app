import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles((theme)=>({
    footerContainer:{
        backgroundColor:'secondary',
        color: "white",
        paddingBottom: '40px'
    }
}))

export default function Footer(){

    const classes = useStyle();

    return(
        <div className={classes.footerContainer}>
            <hr/>
           Made by ahxank47@gmail.com
        </div>
    );
}