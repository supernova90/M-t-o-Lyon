import styles from "./MainCard.module.css";

export const MainCard = ({ city, country, description, iconName, unitSystem, weatherData }) => {
    const temperature = weatherData?.hourly.temperature_2m[0] ?? "Loading...";

    return (
        <div className={styles.card}>
            <h1>{`${city}, ${country}`}</h1>
            <p>{description}</p>
            <img src={iconName} alt="Weather Icon" />
            <h2>{`Température: ${temperature}°C`}</h2>
            <h2>{`Feels like: ${temperature}°C`}</h2> {/* Remplacez par la valeur réelle si vous avez cette donnée */}
        </div>
    );
};
