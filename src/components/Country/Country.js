import React, { Component } from "react";
import './Country.css';
import {withRouter} from "react-router";


// https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z

class Country extends Component {
    constructor() {
        super();
        // this is the go back button and binding it
        this._buttonClicked = this._buttonClicked.bind(this);
        this.state = {
            countries: []
        }
    }
    componentDidMount() {
        console.log(this.props.match.params);
        //  countryName is going to be taken from the url (the routing link)
        // then we're going to replace it in the link
        const {countryName} = this.props.match.params;
        // console.log(`https://api.covid19api.com/country/${countryName}?from=2020-10-01T00:00:00Z&to=2020-10-15T00:00:00Z`);
        
        // i'm using this API call to fetch the information about confirmed, recovered cases and deaths
        // you can go on the covid website to check if this one is good or if we should use a diff one
        fetch(`https://api.covid19api.com/country/${countryName}?from=2020-10-01T00:00:00Z&to=2020-10-15T00:00:00Z`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                //  this is an array because the parameters are dates
                // Oct 1 - Oct 15 so there's going to be multiple array elements
                countries: data
            })
        })
    }
    //  when users click the go back button, it'll return them to the home page
    _buttonClicked(event) {
        event.preventDefault();
        window.location.href = `/`;
    }
    render(){
        // const {country} = this.props.match.params;
        return(
            <div className="country">
                <div>
                    {/*  this shows information about the cases and deaths*/}
                    {this.state.countries.map((country) => <p key={country.Date} value={country.Date}>Date: {country.Date}  <br></br> Confirmed Cases: {country.Confirmed}  <br></br> Recovered Cases: {country.Recovered}  <br></br> Deaths: {country.Deaths}</p>)}
                </div>
                 <div className="goBack">
                    <button onClick={this._buttonClicked}>Go Back</button>
                 </div>
            </div>
        );
    }
}
export default withRouter(Country);