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

export { individualizeEvents };