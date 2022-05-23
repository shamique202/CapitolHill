import React from 'react';
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ErrorMessage(props){
    return <span className={"error"}>{props.error}</span>
}