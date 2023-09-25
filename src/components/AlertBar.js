import React from "react";

import Alert from "./Alert";
import { useContext } from "react";
import AlertContext from "../context/alertContext";
const AlertBar = () => {
    const context1  = useContext(AlertContext);
    const{alert} = context1;
  return (
    <>
     <Alert alert={alert}/>
    </>
  );
};

export default AlertBar;