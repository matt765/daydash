import React from 'react'
import App from './App.js';
import spinner from '../images/spinner.gif'

class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cityValue: "",
            errorMessage: "",
            key: process.env.REACT_APP_API_KEY_SECOND,
            validation: false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.setState({ ...this.state, [event.target.name]: value })
    }
    handleChangeName(event) {
        this.setState({ name: event.target.value })
    }
    handleSubmit(event) {
        this.setState({ loading: true })
        if (this.state.name.length < 3) {
            this.setState({ errorMessage: "Please write name with at least 2 characters" })
            this.setState({ loading: false })
        }
        else {
            return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.state.cityValue + '&appid=' + this.state.key)
                .then(function (resp) {
                    return resp.json()
                })
                .then((data) => {
                    if (data.cod === "404" || data.cod === "400") {
                        setTimeout(() => {
                            this.setState({ errorMessage: "Sorry, there is no such city" })
                            this.setState({ loading: false })
                        }, 1000)
                    }
                    else {
                        setTimeout(() => { this.setState({ validation: true }) }, 1000);
                        localStorage.setItem("name", this.state.name);
                        localStorage.setItem("city", this.state.cityValue);
                    }
                })
                .catch(() => {
                    console.log(this.state.validation)
                    console.log("error message")
                })
        }
    }

    render() {
        return (
            this.state.validation ? (<App city={this.state.cityValue} name={this.state.name} />) :
                (
                    <div className="starting-container">
                        <div className="input-box"
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-center"
                            data-aos-duration="1000"
                        >
                            <div className="box-title"><span className="box-colored">Welcome to</span> Daily Dashboard!</div>
                            <div className="box-subtitle">Please state your name and location</div>
                            <form
                                onSubmit={
                                    (e) => {
                                        e.preventDefault();
                                        this.handleSubmit(this.state.cityValue);
                                    }
                                }
                            >
                                <div className="inputs">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        placeholder="Name"
                                        maxlength="10"
                                    />

                                    <input
                                        type="text"
                                        name="cityValue"
                                        id="city"
                                        value={this.state.cityValue}
                                        onChange={this.handleChange}
                                        placeholder="City" />

                                </div>
                                <div className="error-message">{this.state.errorMessage}</div>
                                {this.state.loading ? <img alt="" src={spinner} /> : (<button type="submit" value="Send" >Submit</button>)}
                            </form>
                        </div>
                    </div>
                )
        )
    }

}

export default Start
