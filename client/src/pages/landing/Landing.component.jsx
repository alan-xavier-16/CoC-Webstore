import React from "react";
import { Link } from "react-router-dom";

import "./Landing.styles.scss";

const Landing = (props) => {
  return (
    <section className="landing">
      <div className="landing-showcase">
        <div className="landing-header">
          <h1>Circles of Consciousness</h1>
          <p>Experience the Oneness of Mind-Body-Soul</p>
        </div>

        <hr></hr>

        <div className="user-actions">
          <Link to="/services" className="btn btn-gold">
            <i className="fas fa-praying-hands"></i> View Services
          </Link>
          <Link to="/shop-by-categories" className="btn btn-gold">
            <i className="fas fa-feather-alt"></i> Shop Now
          </Link>
          <Link to="/courses" className="btn btn-gold">
            <i className="fas fa-user-graduate"></i> View Courses
          </Link>
        </div>
      </div>

      <div className="landing-info">
        <div className="cards">
          <div className="card">
            <div className="card-img">
              <img
                src={require("../../assets/tarot-cards.jpg")}
                alt="Services"
              />
            </div>

            <div className="card-body">
              <h3 className="card-title">
                Holistic{" "}
                <span className="holy">
                  <i className="fas fa-praying-hands"></i>
                </span>{" "}
                Services
              </h3>
              <p className="card-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,
                quidem facere? Possimus, rerum. Dignissimos, vel aut. Laboriosam
                veniam illum neque. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Atque laborum exercitationem voluptatibus cum.
                Autem quis enim rem consectetur adipisci mollitia. Pariatur
                ipsam ratione necessitatibus id eum expedita fugit ullam debitis
                ex iure, excepturi laudantium, nihil velit fuga ipsa veritatis
                culpa dolor illum? Repellendus dignissimos commodi numquam
                assumenda, corporis eum nesciunt!
              </p>
              <Link to="/services" className="btn btn-gold">
                <i className="fas fa-praying-hands"></i>
                <span> View Services</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={require("../../assets/herbal.jpg")} alt="Services" />
            </div>

            <div className="card-body">
              <h3 className="card-title">
                Lil Herbal{" "}
                <span className="herb">
                  <i className="fas fa-feather-alt"></i>
                </span>{" "}
                In-Shop
              </h3>
              <p className="card-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,
                quidem facere? Possimus, rerum. Dignissimos, vel aut. Laboriosam
                veniam illum neque. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Neque hic, dolore, deleniti cupiditate autem
                voluptatibus ea esse aliquid atque blanditiis explicabo quo
                incidunt, quibusdam odit est beatae eius rem. Fuga quaerat, a
                assumenda quas eligendi aliquid recusandae ea ducimus excepturi
                harum officia facere repellat corporis dolore nulla animi
                exercitationem repellendus?
              </p>
              <Link to="/shop-by-categories" className="btn btn-gold">
                <i className="fas fa-feather-alt"></i>
                <span> Shop Now</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-img">
              <img src={require("../../assets/study.jpg")} alt="Services" />
            </div>

            <div className="card-body">
              <h3 className="card-title">
                Workshops <i className="fas fa-user-graduate"></i>
              </h3>
              <p className="card-description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et,
                quidem facere? Possimus, rerum. Dignissimos, vel aut. Laboriosam
                veniam illum neque. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Neque hic, dolore, deleniti cupiditate autem
                voluptatibus ea esse aliquid atque blanditiis explicabo quo
                incidunt, quibusdam odit est beatae eius rem. Fuga quaerat, a
                assumenda quas eligendi aliquid recusandae ea ducimus excepturi
                harum officia facere repellat corporis dolore nulla animi
                exercitationem repellendus?
              </p>
              <Link to="/courses" className="btn btn-gold">
                <i className="fas fa-user-graduate"></i>
                <span> View Courses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
