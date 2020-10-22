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
            countries: [],
            countryStart: "",
            countryEnd: ""
        }
    }

    async componentDidMount() {
        console.log(this.props.match.params);
        //  countryName is going to be taken from the url (the routing link)
        // then we're going to replace it in the link
        const {countryName} = this.props.match.params;
        // console.log(`https://api.covid19api.com/country/${countryName}?from=2020-10-01T00:00:00Z&to=2020-10-15T00:00:00Z`);
        

        // to get most current date, will be figuring out today's date and then inserting that into API call
        const today = new Date();
        const date = today.getUTCDate();

        // i'm using this API call to fetch the information about confirmed, recovered cases and deaths
        // you can go on the covid website to check if this one is good or if we should use a diff one
        await fetch(`https://api.covid19api.com/total/country/${countryName}?from=2020-10-01T00:00:00Z&to=2020-10-${date}T00:00:00Z`)
//         .then(response => response.json())
        .then(response => {
                if (!response.ok){
                        throw new Error("Network response was not ok.");
                }
                return response.json();
        }
        )
        .then(data => {
                if(data.length !== 0){
                        this.setState({
                        //  this is an array because the parameters are dates
                        // Oct 1 - Oct 15 so there's going to be multiple array elements
                        countries: data,
                        countryStart: data[0],
                        countryEnd: data[data.length - 1] 
                }
        
// .then(function => ) check for response status before anything, if it's not then throw an error
// if its not 200, then throw an error 
// catch error after i throw
// fetch catch documentation 

            )}
        })
        .catch(error => {
                console.log("There has been a problem with fetch operation:", error);
        })
    }
    //  when users click the go back button, it'll return them to the home page
    _buttonClicked(event) {
        event.preventDefault();
        window.location.href = `/`;
    }


    render(){
        // const {country} = this.props.match.params;
        // check for response status

        const confirmed = this.state.countryEnd.Confirmed - this.state.countryStart.Confirmed;
        const recovered = this.state.countryEnd.Recovered - this.state.countryStart.Recovered;
        const deaths = this.state.countryEnd.Deaths - this.state.countryStart.Deaths;

        return(

            <div>
                <h1>{this.state.countryEnd.Country}</h1>
                <div className="country">   
                <div className="flip-card">
                        <div className="flip-card-inner">
                                <div className="flip-card-front">
                                        <h1>Confirmed Cases</h1>
                                </div>
                                <div className="flip-card-back">
                                        <p>{String(confirmed)}</p>
                                </div>
                        </div>
                </div>

                <br/>

                <div className="flip-card">
                        <div className="flip-card-inner">
                                <div className="flip-card-front">
                                        <h1>Recovered Cases</h1>
                                </div>
                                <div className="flip-card-back">
                                        <p>{String(recovered)}</p>
                                </div>
                        </div>
                </div>

                <br/>

                <div className="flip-card">
                        <div className="flip-card-inner">
                                <div className="flip-card-front">
                                        <h1>Deaths</h1>
                                </div>
                                <div className="flip-card-back">
                                        <p>{String(deaths)}</p>
                                </div>
                        </div>
                </div>
                </div>
             
                 <div className="goBack">
                    <button onClick={this._buttonClicked}>Go Back</button>
                 </div>
            </div>
                

        );
        }
    }

export default withRouter(Country);