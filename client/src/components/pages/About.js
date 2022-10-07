import React, { Component } from "react";
import "./styles/About.css";
import Header from "../fixtures/Header";
import OurStoryImg from "../../assets/vectors/OurStory.svg";
import AboutStatsCard from "../cards/AboutStatsCard";
import Footer from "../fixtures/Footer";
import AboutTeammateCard from "../cards/AboutTeammateCard";
import MohImg from "../../assets/images/Moh.jpg";
import MahImg from "../../assets/images/Mah.jpg";
import MajImg from "../../assets/images/Maj.jpg";
import YasImg from "../../assets/images/Yas.jpg";

class About extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      opinions: [
        {
          text: "What a nice product from unifood, keep going!",
          from: "Mark Raj",
        },
        {
          text: "Unifood providing an easy UI and good UX to facilitates user movements.",
          from: "Mousa Ahmad",
        },
        {
          text: "High speed, performance and nice response to the clients requests",
          from: "Jhon Wick",
        },
      ],
      currentOpinionIndex: 0,
    };

    // Binding Methods
    this.startOpinions = this.startOpinions.bind(this);
  }

  startOpinions() {
    let current = this.rootRef.current;
    let opinion = current.querySelector("#about-opinion");
    let text = current.querySelector("#about-opinion-text");
    let from = current.querySelector("#about-opinion-from");
    let dots = current.querySelectorAll(".about-opinions-dot");

    setInterval(() => {
      opinion.style.opacity = 0;
      setTimeout(() => {
        let index = this.state.currentOpinionIndex + 1;        
        this.setState(
          {
            currentOpinionIndex: this.state.currentOpinionIndex < 2 ? index : 0,            
          },
          () => {
            opinion.style.opacity = 1;
            dots.forEach((dot) => {
              if (dot.getAttribute("id")) dot.removeAttribute("id");
            });
            dots[this.state.currentOpinionIndex].setAttribute(
              "id",
              "about-opinions-active-dot"
            );
          }
        );
      }, 500);
    }, 3500);
  }
  componentDidMount() {
    this.startOpinions();    
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="about-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <Header
          // Determines If The Notifications Panel Opens Or Not.
          isNotificationsOpen={this.state.isNotificationsOpen} // Required
          notificationsOnClick={this.notificationsButtonClicked} // Required
          onNotificationsClose={this.onNotificationsClose} // Required
          onNotificationsOpen={this.onNotificationsOpen} // Optional
          cartOnClick={this.cartButtonClicked} // Optional
          searchOnClick={this.searchButtonClicked} // Optional
          notificationsHandler={this.getNotifications} // Required (Very Important)
          cartCount={this.state.cartCount}
          notificationsCount={this.state.notificationsCount}
          activeMenuIndex={2}
          isHome="true"
        />
        <section id="about-intro-section">
          <div id="about-story-container">
            <div id="about-story-left">
              <label id="about-story-title">Our Story</label>
              <p id="about-story-description">
                During the COVID19, Unifood services idea started at 2020 and
                the team start implementing the idea in May 2021 then released
                in July 2021.
              </p>
            </div>
            <div id="about-stats-container">
              <AboutStatsCard number={100} stats="100+" for="Universities" />
              <AboutStatsCard number={350} stats="350+" for="Restaurants" />
              <AboutStatsCard number={3000} stats="3k" for="Users" />
            </div>
          </div>
          <img id="about-story-right" alt="" src={OurStoryImg} />
        </section>
        <section id="about-opinions">
          <label>What are they said</label>
          <div id="about-opinion">
            <p id="about-opinion-text">
              {this.state.opinions[this.state.currentOpinionIndex].text}
            </p>
            <span id="about-opinion-from">
              - {this.state.opinions[this.state.currentOpinionIndex].from}
            </span>
          </div>
          <div id="about-opinions-dots">
            <div
              className="about-opinions-dot"
              id="about-opinions-active-dot"
            ></div>
            <div className="about-opinions-dot"></div>
            <div className="about-opinions-dot"></div>
          </div>
        </section>
        <section id="about-team-section">
          <label>Meet Our Team</label>
          <div id="about-teammates">
            <AboutTeammateCard
              photo={MohImg}
              name="Muhammed Al-Haj Houssein"
              career="Software Developer - Designer"
              twitter="#"
              instagram="#"
              facebook="#"
            />
            <AboutTeammateCard
              photo={MahImg}
              name="Mahmoud Al-Toukhi"
              career="Software Developer"
              twitter="#"
              instagram="#"
              facebook="#"
            />
            <AboutTeammateCard
              photo={YasImg}
              name="Yasseen Midani"
              career="Software Developer"
              twitter="#"
              instagram="#"
              facebook="#"
            />
            <AboutTeammateCard
              photo={MajImg}
              name="Majd Al-Shatti"
              career="Software Developer"
              twitter="#"
              instagram="#"
              facebook="#"
            />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default About;
