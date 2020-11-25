export default class RTCPEvents {
    _registeredEvents = {};
    _events = [];

    registerEventHandler(event, handler) {
        if (!this._events.includes(event)) {
            throw "Unable to register handler for unknown event: " + event;
        }

        this._registeredEvents[event] = this._registeredEvents[event] || []; // create array for this event if still undefined
        this._registeredEvents[event].push(handler);
    }

    unregisterEventHandler(event, handler) {
        if (this._registeredEvents[event]) {
            this._registeredEvents[event] = this._registeredEvents[event].filter((h) => h !== handler);
        }
    }

    _emitEvent(event, ...args) {
        for (let handler of this._registeredEvents[event] || []) {
            handler(...args);
        }
    }
}
