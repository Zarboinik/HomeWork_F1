import React from "react";
import {dateTimeFormatter} from "../utils/utils";

interface WeatherProps {
    data: any
}

export default function WeatherDataRow({data}: WeatherProps) {
    if (!data || !data.weather || data.weather.length === 0) {
        return null;
    }

    return (
        <tr>
            <td>{dateTimeFormatter(data.dt)}</td>
            <td>{(data.main?.temp - 273.15).toFixed(0)}°C</td>
            <td>{data.weather[0].main}</td>
            <td>{data.weather[0].description}</td>
        </tr>
    );
}