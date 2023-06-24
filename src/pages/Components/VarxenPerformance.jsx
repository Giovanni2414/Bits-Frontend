import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


const VarxenPerformance = () => {
    return (
      <>
        <Navbar/>
        <Outlet/>
      </>
    );
}

export default VarxenPerformance;
