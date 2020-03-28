import React, { Component } from "react";
import Airtable from "airtable";
import Background1 from "../images/1.JPG";
import Background2 from "../images/2.JPG";
import Background3 from "../images/3.JPG";

var base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base("appWcaRixzmd3j2m1");

const UserHint = ({ hintText }) => (
  <p className="f3-l f5-m f5-s lh-copy mb5 sharp text-color">{hintText}</p>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      searchTerm: "",
      hintText: "sign up for early access"
    };
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
      hintText:
        value.length > 0 ? `hit enter to sign up` : "sign up for early access"
    }));
  };

  handleKeyPress = event => {
    const { value } = event.target;
    if (value.length > 0 && event.key === "Enter") {
      this.validateEmail(value);
    }
  };

  validateEmail = searchTerm => {
    // if (searchTerm.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    var re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    if (re.test(String(searchTerm).toLowerCase())) {
      this.submitEmail(searchTerm);
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: "you’ve signed up"
      }));
    } else {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: "we need a real email to sign you up"
      }));
    }
  };

  submitEmail = email => {
    try {
      base("Emails Collected").create(
        [
          {
            fields: {
              Name: email
            }
          }
        ],
        function(err, records) {
          if (err) {
            console.error(err);
            return;
          }
          records.forEach(function(record) {
            console.log(record.getId());
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <div className="vh-100 dt w-100 tc white cover">
          {/* First Page */}
          <div
            className="dtc v-mid cover ph3 ph4-m ph5-l"
            style={{
              backgroundImage: `url(${Background1})`
              // backgroundAttachment: "fixed"
            }}
          >
            <h1 className="f1 f-headline-l white sharp">soulo</h1>
          </div>
        </div>
        <div className="vh-100 dt w-100 tc white cover">
          {/* Second Page */}
          <div
            className="dtc v-mid cover ph3 ph4-m ph5-l"
            style={{ backgroundImage: `url(${Background2})` }}
          >
            <h1 className="f1-l f2-m lh-title white sharp">
              life is a single player game
            </h1>
          </div>
        </div>
        <div className="vh-100 dt w-100 tc section-color cover">
          {/* Third Page */}
          <div className="dtc v-mid cover ph3 ph4-m ph5-l pa4">
            <div className="w-60-l w-100">
              <h2 className="f1-l f2-m lh-title tl sharp text-color">
                who <b className="text-highlight"> you</b> are ?
              </h2>
              <p className="f4-l f5-m lh-copy tl mb4 surt text-color">
                In today's world, we are so focused on crafting perfect online
                images of ourselves that we forgot who we really are.
              </p>
              <p className="f4-l f5-m lh-copy tl mb4 surt text-color">
                How many times did you not share a photo you loved because it
                would not get enough likes? How many times did you not tweet a
                curious thought just because it might be misinterpreted? How
                many more times would you self-censor artifacts of your precious
                moments to stop worrying what other people might think.
              </p>
              <p className="f4-l f5-m lh-copy tl mb4 surt text-color">
                Soulo is a safe space where you can be true you and no one is
                there to judge. Every memory you share is private forever. Stop
                pretending, start living.
              </p>
            </div>
          </div>
        </div>
        <div className="vh-100 dt w-100 tc white cover">
          {/* Fourth Page */}
          <div
            className="dtc v-mid cover ph3 ph4-m ph5-l"
            style={{ backgroundImage: `url(${Background3})` }}
          >
            <h1 className="f1-l f2-m  lh-title white sharp">
              it’s time to be free
            </h1>
          </div>
        </div>
        <div className="vh-100 dt w-100 tc cover section-color sharp">
          {/* Fifth Page */}
          <div className="dtc v-mid cover">
            <input
              className="input f1-l f2-m"
              placeholder="enter your email"
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.searchTerm}
              ref={this.textInput}
            />
            <UserHint {...this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
