function individualizeEvents(events) {
    if (events.length === 0 || !events) {
        return [];
    }

    const individualizedEvents = [];

    events.forEach((event) => {
        // Events have a seances key that contains an array of seances
        // Each seance has a field and value key, we only care about the value
        // The value is an object with a date and time key

        // If no seances, event is invalid... 
        if (!event.seances) {
            return;
        }

        // We need to create a new event for each seance
        event.seances.forEach((seance) => {
            // When individualizing, we need to set date and time to the event, not the seance
            let newEvent = {
                ...event,
                date: seance.value.date,
                time: seance.value.time,
            };

            // Generate random integer between 0 and 1000
            const randomInt = Math.floor(Math.random() * 1000);

            // Edit the _id to be unique
            newEvent._id = newEvent._id + "---" + seance.value.date + "///" + seance.value.time + "---" + randomInt;

            // We also need to remove the seances key
            delete newEvent.seances;

            individualizedEvents.push(newEvent);
        });
    });

    return individualizedEvents;
}

function handleEvents(events, removePastSeances = false) {
    if (events.length === 0 || !events) {
        return [];
    }

    // Map events
    let handledEvents = events.map((event) => {
        event.seances = event.seances.map((seance) => {
            // For each seance, we format the date and time to be more readable
            let eventDate = new Date(seance.value.date);
            let day = eventDate.getDate();
            let month = eventDate.getMonth() + 1;
            let year = eventDate.getFullYear();

            // If the seance is in the past, we remove it
            if (eventDate < new Date() && removePastSeances) {
                return null;
            }

            // Human readable date ( mardi 12 octobre 2021 ), year is optional if it's the current year
            let humanReadableDate = "";
            if (eventDate.getFullYear() === new Date().getFullYear()) {
                humanReadableDate = eventDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
            } else {
                humanReadableDate = eventDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
            }

            // In x months, x days, x hours, x minutes
            let timeDifference = eventDate - new Date();
            let months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
            let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

            let humanReadableTime = "";
            if (months > 0) {
                humanReadableTime = `dans ${months} mois`;
            } else if (days > 0) {
                humanReadableTime = `dans ${days} jour${days > 1 ? "s" : ""}`;
            } else if (hours > 0) {
                humanReadableTime = `dans ${hours} heure${hours > 1 ? "s" : ""}`;
            } else if (minutes > 0) {
                humanReadableTime = `dans ${minutes} minute${minutes > 1 ? "s" : ""}`;
            } else {
                humanReadableTime = "maintenant";
            }

            let prettyTime = ""; // 12h00
            let time = seance.value.time.split(":");
            let hoursInt = parseInt(time[0]);
            let minutesInt = parseInt(time[1]);
            if (hoursInt < 10) {
                prettyTime += "0";
            }
            prettyTime += hoursInt + "h";
            if (minutesInt < 10) {
                prettyTime += "0";
            }
            prettyTime += minutesInt;

            return {
                id: event.seances.indexOf(seance),
                rawDate: seance.value.date,
                humanReadableDate: humanReadableDate,
                humanReadableTime: humanReadableTime,
                date: `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`,
                time: seance.value.time,
                prettyTime: prettyTime,
            };
        });

        // Remove null seances
        event.seances = event.seances.filter((seance) => seance !== null);

        // Sort seances by date
        event.seances.sort((a, b) => {
            if (a.rawDate < b.rawDate) return -1;
            if (a.rawDate > b.rawDate) return 1;
            return 0;
        });

        // If the event has no seances, we remove it
        if (event.seances.length === 0) {
            return null;
        }

        return event;
    });

    // Remove null events
    handledEvents = handledEvents.filter((event) => event !== null);

    return handledEvents;
}

export { individualizeEvents, handleEvents };