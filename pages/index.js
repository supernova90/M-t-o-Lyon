import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [unitSystem, setUnitSystem] = useState("metric");

    const changeSystem = () => {
        setUnitSystem((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    };

    const fetchWeatherData = async (latitude, longitude) => {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données météo.");
        }

        const data = await response.json();
        return data;
    };

    const loadConfig = async () => {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error("Erreur lors du chargement de la configuration.");
        }
        const config = await response.json();
        if (typeof config.latitude !== 'number' || typeof config.longitude !== 'number') {
            throw new Error("Latitude et longitude doivent être des nombres.");
        }
        return config;
    };

    const getWeatherData = async () => {
        try {
            const config = await loadConfig();
            const data = await fetchWeatherData(config.latitude, config.longitude);
            if (data.error) {
                throw new Error(data.reason);
            }
            setWeatherData(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données météo :", error);
            setWeatherData({ error: true, reason: error.message });
        }
    };

    useEffect(() => {
        getWeatherData();
        const interval = setInterval(getWeatherData, 3600000); // Récupération chaque heure
        return () => clearInterval(interval);
    }, []);

    if (weatherData?.error) {
        return <ErrorScreen errorMessage={weatherData.reason} />;
    }

    if (!weatherData) {
        return <LoadingScreen loadingMessage="Loading data..." />;
    }

    return (
        <div className={styles.wrapper}>
            <MainCard
                city="Lyon"
                country="FR"
                description={`Température: ${weatherData.hourly.temperature_2m[0]}°C`}
                iconName="weather_icon"
                unitSystem={unitSystem}
                weatherData={weatherData}
            />
            <ContentBox>
                <Header>
                    <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
                </Header>
                <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
                <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
            </ContentBox>
        </div>
    );
};

export default App;