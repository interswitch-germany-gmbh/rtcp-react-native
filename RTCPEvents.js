export default class RTCPEvents {
    registeredEvents = {};
    events = [];

    registerEventHandler(event, handler) {
        if (!this.events.includes(event)) {
            throw "Unable to register handler for unknown event: " + event;
        }

        this.registeredEvents[event] = this.registeredEvents[event] || []; // declare array for this event if empty
        this.registeredEvents[event].push(handler);
    }

    unregisterEventHandler(event, handler) {
        if (this.registeredEvents[event]) {
            this.registeredEvents[event] = this.registeredEvents[event].filter((h) => h !== handler);
        }
    }

    _emitEvent(event, ...args) {
        for (let handler of this.registeredEvents[event] || []) {
            handler(...args);
        }
    }
}
