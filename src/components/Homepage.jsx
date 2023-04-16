import React from "react";
import { Link } from "react-router-dom";
import home from './pictures/home.jpeg';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepic" style={{ position: "relative" }}>
        <img src={home} alt="" style={{ maxWidth: "2600px" }} />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "1rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px"
          }}
        >
          <p>Experience the ultimate relaxation and comfort with our selection of guest houses.</p>
          <p>Our web app makes it easy to find and book the guesthouse for your next trip, with direct bookings that save you time and money.</p>
          <p>Start browsing now and experience the comfort and convenience of our guesthouses!!!</p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "90%",
            left: "15%",
            transform: "translate(-50%, -50%)",
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <input type="text" placeholder="Search for your guesthouse here!" style={{ marginRight: "10px", padding: "15px" }} />
          <Link to="/guesthouselist">
            <button style={{ backgroundColor: "blue", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}>Search</button>
          </Link>
        </div>
        <div style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          textAlign: "center",
          boxShadow: "2px 2px 5px #999",
          lineHeight: "60px"
        }}>
          <Link to="/guesthouselist">
            <span style={{ fontSize: "1.2rem" }}>See </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;