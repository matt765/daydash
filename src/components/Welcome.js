import React from 'react'
import { useState, useEffect } from 'react';

function Welcome(props) {
    const [cityValue, setCityValue] = useState(props.city)
    const [timezone, setTimezone] = useState("")
    const [firstName, setFirstname] = useState("")
    const [secondName, setSecondname] = useState("")
    const [today, setToday] = useState("")
    const [monthDay, setMonthday] = useState("")
    const [monthName, setMonthname] = useState("")
    const [year, setYear] = useState("")

    useEffect(() => {
        let today = new Date();
        let date = today.getDay()
        let monthday = today.getDate()
        let month = today.getMonth()
        let year = today.getFullYear()
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[date];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthName = months[month]
        setToday(dayName)
        setMonthday(monthday)
        setMonthname(monthName)
        setYear(year)
    }, [])

    useEffect(() => {
        let key = '7485738ba74b5d861b91ad0f7b6ae2dc';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + '&appid=' + key)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                setTimezone(data.sys.country)
            })

    }, [cityValue]);

    useEffect(() => {
        fetch(`https://api.abalin.net/today?country=${timezone}`)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                if (timezone) {
                    for (var key in data.data.namedays) {
                        if (data.data.namedays[key] !== "n/a") {
                            if (data.data.namedays.hasOwnProperty(key)) {
                                let namesArray = data.data.namedays[key].split(',').slice(0, 2)
                                setFirstname(namesArray[0])
                                setSecondname(namesArray[1])
                            }
                        } else {
                            setCityValue("Washington")
                        }
                    }

                }

            })
            .catch(function () {
                // document.getElementById("noCity").classList.toggle("invisible");
            });

    }, [timezone])

    return (
        <div className="welcome-container main-component" data-aos="fade-down" data-aos-duration="1000">
            <div className="welcome-name">Hello <br /> {props.name}</div>
            <div className="welcome-date">Today is <span className="welcome-subtext">{today ? today : ""}, {monthDay ? monthDay : ""} {monthName ? monthName : ""} {year ? year : ""}</span></div>
            <div className="welcome-names">Name day of {firstName ? firstName : ""}  {secondName ? `and ${secondName}` : ""}</div>
        </div>
    )
}

export default Welcome
