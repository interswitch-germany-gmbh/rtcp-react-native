export default abstract class RTCPEvents {
    protected abstract readonly _events: readonly string[];
    private _registeredEvents: Record<string, Function[]> = {};

    public registerEventHandler(event: string, handler: Function): void {
        if (!this._events.includes(event)) {
            throw new Error(`Unable to register handler for unknown event: ${event}`);
        }

        this._registeredEvents[event] = this._registeredEvents[event] || []; // create array for this event if still undefined
        this._registeredEvents[event].push(handler);
    }

    public unregisterEventHandler(event: string, handler: Function): void {
        if (this._registeredEvents[event]) {
            this._registeredEvents[event] = this._registeredEvents[event].filter((h) => h !== handler);
        }
    }

    protected _emitEvent(event: string, ...args: any[]): void {
        this._registeredEvents[event]?.forEach((handler) => handler(...args));
    }
}
