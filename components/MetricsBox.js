import { degToCompass } from "../services/converters";
import {
    getTime,
    getAMPM,
    getVisibility,
    getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const humidity = weatherData.main?.humidity ?? "Loading...";
    const windSpeed = getWindSpeed(unitSystem, weatherData.wind?.speed) ?? "Loading...";
    const windDirection = degToCompass(weatherData.wind?.deg) ?? "Loading...";
    const visibility = getVisibility(unitSystem, weatherData.visibility) ?? "Loading...";
    const sunrise = weatherData.sys ? getTime(unitSystem, weatherData.sys.sunrise, weatherData.timezone) : "Loading...";
    const sunset = weatherData.sys ? getTime(unitSystem, weatherData.sys.sunset, weatherData.timezone) : "Loading...";
    const sunriseAMPM = weatherData.sys ? getAMPM(unitSystem, weatherData.sys.sunrise, weatherData.timezone) : "";
    const sunsetAMPM = weatherData.sys ? getAMPM(unitSystem, weatherData.sys.sunset, weatherData.timezone) : "";

    return (
        <div className={styles.wrapper}>
            <MetricsCard
                title={"Humidity"}
                iconSrc={"/icons/humidity.png"}
                metric={humidity}
                unit={"%"}
            />
            <MetricsCard
                title={"Wind speed"}
                iconSrc={"/icons/wind.png"}
                metric={windSpeed}
                unit={unitSystem === "metric" ? "m/s" : "m/h"}
            />
            <MetricsCard
                title={"Wind direction"}
                iconSrc={"/icons/compass.png"}
                metric={windDirection}
            />
            <MetricsCard
                title={"Visibility"}
                iconSrc={"/icons/binocular.png"}
                metric={visibility}
                unit={unitSystem === "metric" ? "km" : "miles"}
            />
            <MetricsCard
                title={"Sunrise"}
                iconSrc={"/icons/sunrise.png"}
                metric={sunrise}
                unit={sunriseAMPM}
            />
            <MetricsCard
                title={"Sunset"}
                iconSrc={"/icons/sunset.png"}
                metric={sunset}
                unit={sunsetAMPM}
            />
        </div>
    );
};
