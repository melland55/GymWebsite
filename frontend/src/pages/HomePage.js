import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

function HomePage() {

    return (
      <div className="container-fluid" style={{ padding: "0rem", height: "100vh" }}>
        <NavBar/>
      </div>
    );
  }

  export default HomePage;