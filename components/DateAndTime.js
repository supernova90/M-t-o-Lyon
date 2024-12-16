import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
    // Vérifiez que weatherData est défini et contient les informations nécessaires
    if (!weatherData || !weatherData.dt || !weatherData.timezone) {
        return (
            <div className={styles.wrapper}>
                <h2>Loading...</h2>
            </div>
        );
    }

    // Récupérez les informations de la date et de l'heure
    const weekDay = getWeekDay(weatherData);
    const time = getTime(unitSystem, weatherData.dt, weatherData.timezone);
    const ampm = getAMPM(unitSystem, weatherData.dt, weatherData.timezone);

    return (
        <div className={styles.wrapper}>
            <h2>{`${weekDay}, ${time} ${ampm}`}</h2>
        </div>
    );
};
