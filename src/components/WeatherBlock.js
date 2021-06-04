import React from 'react'

function WeatherBlock(props) {
    return (
        <div className="weather-hourblock">
            <div className="weather-hourblock-date">{props.date}</div>
            <div className="weather-hourblock-hour">{props.hour}:00</div>
            <div className="weather-hourblock-icon"><img alt="" src={props.image}/></div>
            <div className="weather-hourblock-temp">{props.temp}°</div>
          </div>
    )
}

export default WeatherBlock
