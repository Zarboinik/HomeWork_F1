import React, {useEffect, useState} from "react";
import "../styles/App.css";
import useApi from "../hooks/use-api";
import Form from "react-bootstrap/Form";
import {Col, Row, Table} from "react-bootstrap";
import WeatherDataRow from "./WeatherDataRow";
import {Cities} from "./cities";

export default function App() {
    const [page, loadPage] = useApi({manual: true});
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [day, setDay] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const fetchPage = (lat, lon) => {
        if (day && lat != null) {
            loadPage({
                url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=8cfc96d690c947b174386c94f439753a`,
            });
        } else if (lat != null) {
            loadPage({
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8cfc96d690c947b174386c94f439753a`,
            });
        }
    };

    useEffect(() => {
        fetchPage(lat, lon);
    }, [lat, lon]);

    useEffect(() => {
        fetchPage(lat, lon);
    }, [day]);

    const handleCityChange = event => {
        const selectedCity = Cities[event.target.value];

        if (selectedCity) {
            setLat(selectedCity.lat);
            setLon(selectedCity.lon);
        }
    };

    useEffect(() => {
        if (page) {
            setWeatherData(page);
        }
    }, [page]);

    return (
        <>
            <Row>
                <Col>
                    <Form.Select aria-label="Select a city" onChange={handleCityChange}>
                        <option>Select city</option>
                        {Object.keys(Cities).map(cityName => (
                            <option key={cityName} value={cityName}>{Cities[cityName].name}</option>
                        ))}
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select aria-label="Select a day" onChange={() => setDay(!day)}>
                        <option value="Now">Now</option>
                        <option value="24h">24 hours</option>
                    </Form.Select>
                </Col>
            </Row>
            {weatherData && (
                <Table striped bordered hover variant="light">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Weather</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!day ? (
                        <WeatherDataRow data={weatherData}/>
                    ) : (
                        weatherData.list?.map((forecastData, index) => (
                            <WeatherDataRow key={index} data={forecastData}/>
                        ))
                    )}
                    </tbody>
                </Table>
            )}
        </>
    );
}
