import React, { Component } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch 
} from 'react-router-dom';
import Home from "./components/Home/Home";
import Country from "./components/Country/Country";

// const api= {
//   key: "5577YvzU4bK63a1WIQ3Z043H",
//   base: "https://api.covid19api.com/countries"
// }

// _handleSubmit(event) {
//   event.preventDefault();
// }

class App extends Component {

  render() {
    return (
      <Router>     
      <Switch>
        {/* Routes for Home page and Results */}
        <Route exact path="/"><Home /></Route>
        <Route exact path="/result/:countryName"><Country /></Route>
      </Switch>
      </Router>
    );
  }
}

export default App;
