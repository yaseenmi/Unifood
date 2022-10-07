import React, { Component } from "react";
import FAQMessage from "../fixtures/FAQMessage";
import Header from "../fixtures/Header";
import Footer from "../fixtures/Footer";
import DefaultButton from "../inputs/DefaultButton";
import Badges from "../labels/Badges";
import "./styles/Help.css";
import Axios from "axios";
import getHost from "../assitance-methods/getHost";

class Help extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      faqs: [
        {
          q: "What's Unifood?",
          a: "Unifood is a SASS (Software As Services) software offers a university restaurants service for any kind of universities.",
        },
        {
          q: "How can I subscribe Unifood service?",
          a: "First, you have to choose what's your role.",
        },
        {
          q: "What's roles in Unifood?",
          a: "There is tow basic roles: University, Stuff & Manager (Restaurant).",
        },
        {
          q: "If I am a manager what should I do?",
          a: "First you need to check If your university subscribing in our service. If yes, university can adds you to restaurants system.",
        },
        {
          q: "If I am a student/stuff what should I do?",
          a: "You are free to register in the system and starting the journey!",
        },
        {
          q: "If I am a university what should I do?",
          a: "Contact us and with some easy steps you have a restaurants system in the universirty!",
        },
        {
          q: "As a stuff, Can I order from more than one restaurant?",
          a: "Sure, Yes!",
        },
      ],
      selectedFAQIndex: 0,
      messages: [
        {
          message: "Hello dude 👋 Please select from the FAQ tags below...",
          type: "receiver",
        },
      ],
      sendLoader: false,
    };

    // Binding Methods
    this.tagClicked = this.tagClicked.bind(this);
    this.sendFAQClicked = this.sendFAQClicked.bind(this);
    this.sendClicked = this.sendClicked.bind(this);
    this.inKeyUpped = this.inKeyUpped.bind(this);
  }
  inKeyUpped(e)
  {
    if (e.keyCode === 13) this.sendClicked(e);
  }
  sendClicked(e) {
    let current = this.rootRef.current;
    let textIn = current.querySelector("#help-send-problem-message-in input");
    let emailIn = current.querySelector(
      "#help-send-problem-container > input:nth-child(1)"
    );

    let text = textIn.value;
    let email = emailIn.value;

    if (text === "" || email === "") return;
    this.setState({ sendLoader: true });

    let formData = {
      text: text,
      email: email,
    };
    textIn.value = "";
    emailIn.value = "";
    let api = `${getHost()}/customer/sendfeedback`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      setTimeout(() => {
        this.setState({ sendLoader: false });
      }, 1000);
    });
  }
  sendFAQClicked(e) {
    let messagesContainer = this.rootRef.current.querySelector(
      "#help-floating-faq-messages-body"
    );
    let message = {
      message: this.state.faqs[this.state.selectedFAQIndex].q,
      type: "sender",
    };
    this.state.messages.push(message);
    let messages = this.state.messages;
    this.setState({ messages: messages }, () => {
      messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
      setTimeout(() => {
        let messageA = {
          message: this.state.faqs[this.state.selectedFAQIndex].a,
          type: "receiver",
        };
        this.state.messages.push(messageA);
        let messagesA = this.state.messages;
        this.setState({ messages: messagesA }, () => {
          messagesContainer.scrollTo(0, messagesContainer.scrollHeight);
        });
      }, 500);
    });
  }
  tagClicked(e) {
    let target = e.currentTarget;
    let current = this.rootRef.current;
    let question = target.innerText;
    let index = this.state.faqs.findIndex((i) => i.q === question);
    let tags = current.querySelectorAll(
      "#help-floating-faq-messages-foot-tags .badges-container"
    );
    tags.forEach((tag) => {
      if (
        tag.classList.contains("help-floating-faq-messages-foot-selected-tag")
      )
        tag.classList.remove("help-floating-faq-messages-foot-selected-tag");
    });
    target.classList.add("help-floating-faq-messages-foot-selected-tag");
    this.setState({ selectedFAQIndex: index });
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="help-container"
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
          isHome="true"
          activeMenuIndex={3}
        />
        <section id="help-intro-section">
          <div id="help-intro-inner">
            <label>Help Center</label>
            <p>
              How can we help you? please leave a message or check FAQ below
            </p>
            <div id="help-send-problem-container">
              <input
                type="text"
                placeholder="Email"
                onKeyUp={this.inKeyUpped}
              />
              <div id="help-send-problem-message-in">
                <input
                  type="text"
                  placeholder="Explain your problem..."
                  onKeyUp={this.inKeyUpped}
                />
                <DefaultButton
                  id="help-send-btn"
                  loader={this.state.sendLoader}
                  text="Send"                  
                  onClick={this.sendClicked}
                />
              </div>
            </div>
          </div>
        </section>
        <section id="help-floating-faq-container">
          <button id="help-floating-faq-open-btn">
            <i className="bi bi-chat-right-dots-fill"></i>
          </button>
          <div id="help-floating-faq-messages-container" tabIndex="0">
            <div id="help-floating-faq-messages-head">
              <div id="help-floating-faq-messages-head-inner">
                <i className="bi bi-patch-question-fill"></i>
                <label>Unifood - FAQ</label>
              </div>
              <i
                className="bi bi-dash"
                onClick={() => {
                  document.querySelector("#help-send-btn").focus();
                }}
              ></i>
            </div>
            <div id="help-floating-faq-messages-body">
              {this.state.messages.map((message) => {
                return (
                  <FAQMessage message={message.message} type={message.type} />
                );
              })}
            </div>
            <div id="help-floating-faq-messages-foot">
              <div id="help-floating-faq-messages-foot-tags">
                {this.state.faqs.map((faq) => {
                  return (
                    <Badges
                      text={faq.q}
                      background="var(--secondry-color)"
                      onClick={this.tagClicked}
                    />
                  );
                })}
              </div>
              <button
                id="help-floating-faq-messages-foot-send-btn"
                onClick={this.sendFAQClicked}
              >
                <i className="fa fa-send"></i>
              </button>
            </div>
          </div>
        </section>
        <section id="help-map-section">
          <label>Here's our location</label>
          <div>
            <iframe
              id="help-map"
              src="https://maps.google.com/maps?q=damascuse&t=&z=13&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Help;
