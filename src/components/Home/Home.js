import React, { Component } from "react";
import './Home.css';
import {withRouter} from "react-router";

class Home extends Component {
    constructor(){
        super();
        // binding the clicked function
        this._clicked = this._clicked.bind(this)
        this.state = {
          //  array for all the countries in the drop down
          countries: [],
          // selectedCountry is used for the routing of the results page
          selectedCountry: ""
        }
    }
    componentDidMount() {
        // fetch the data of all the countries in the API call 
        // this is used for the drop down on the home page
        fetch("https://api.covid19api.com/countries")
        .then(response => response.json())
        .then(result => {
          // console.log
          // console.log(result);
          let countriesApi = result.map((country => { 
            // display is used for how each drop down menu should look
            // line 33 shows the default value of no countries selected
            return {value: country.Country, display: country.Country}
          }));
          //  sorting the drop down options in alphabetical order
          const sortedCountries = countriesApi.sort((a, b) => a.value.localeCompare(b.value))
          // console.log(sortedCountries);
          // const sortedCountries = this.countriesApi.sort();
          this.setState({
            countries: [{value: '', display: 'Select a Country'}].concat(sortedCountries)
          });
        //   console.log(countriesApi);
        //   console.log(this.state.selectedCountry);
        })
      }

      //  this method is used so that when the user clicks on a drop down option
      //  the state will change selectedCountry to whatever value is selected
    _getCountry(event) {
        console.log(this.state.selectedCountry);
        console.log(event.target.value);
        console.log(this.state.countries);
        this.setState({
          selectedCountry: event.target.value
        });
        // console.log(this.state)
      }

    _clicked(event) {
        event.preventDefault();
        window.location.href = `/result/${this.state.selectedCountry}`;
    }
    render() {
        return(
            <div className="Home">
                <h1>Covid Data</h1>
                <form onSubmit={this._clicked}>
                    <label htmlFor="fname">Countries: </label>
                        <select
                            id="countries"
                            value={this.state.selectedCountry}
                            // ref = {this.countryRef}
                            // onChange={this._selectCountry}>
                            onChange = {this._getCountry.bind(this)}
                            >
                                {/* <option key="Afgahnistan" value="Afghanistan">Afgahnistan</option>
                                <option key="Argentina" value="Argentina">Argentina</option> */}
                            {/* onChange = {(event) => this.setState({selectedCountry: event.target.value})}> */}
                            
                            {/* this part is mapping all the countries into the drop down menu and creating them as option elements */}
                            {this.state.countries.map((country) => <option key={country.value} value={country.value}>{country.display}</option>)}
                            {/* <option value="all">all</option> */}
                        </select>
                    <input type="submit" value="Go" ></input>
                {/* <button onClick={this._clicked()}>Go</button> */}
                </form>
        </div>
      );
    }
}
export default withRouter(Home);