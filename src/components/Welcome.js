import React from 'react'
import { useState, useEffect } from 'react';

function Welcome(props) {
    const [fact, setFact] = useState()
    // używanie poniższego statu nie ma sensu, parsujesz date tylko raz w hooku useEffect (12 linijka) i zmieniasz stan
    // możesz to zrobić w body komponentu po prostu skoro jest to synchorniczna akcja i ustwaiana tylko raz 
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
        // zrobił bym dla faktów osobny komponent ze swoim statem i jego obsługą: loading, error, success
        const fetchFacts = () => {
            fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
                .then(function (resp) {
                    return resp.json()
                })
                .then((resp) => {

                    if (resp.text.length > 100) {
                        fetchFacts()
                    }
                    else {
                        setFact(resp.text)
                    }
                })
        }
        fetchFacts()
    }, [])

    return (
        <div className="welcome-container main-component" data-aos="fade-down" data-aos-duration="1000">
            <div className="welcome-name">Hello <br /> {props.name}</div>
            <div className="welcome-date">Today is <span className="welcome-subtext">{today ? today : ""}, {monthDay ? monthDay : ""} {monthName ? monthName : ""} {year ? year : ""}</span></div>
            <div className="welcome-names">Did you know?<br /><div className="fact"> {fact ? fact : ""}</div> </div>
        </div>
    )
}

export default Welcome
