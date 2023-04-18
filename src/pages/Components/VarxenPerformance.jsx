import React, { Component } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


class VarxenPerformance extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );
  }
}

export default VarxenPerformance;
