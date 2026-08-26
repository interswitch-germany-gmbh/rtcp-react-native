export default abstract class RTCPEvents {
    protected abstract readonly _events: readonly string[];
    private _registeredEvents;
    registerEventHandler(event: string, handler: Function): void;
    unregisterEventHandler(event: string, handler: Function): void;
    protected _emitEvent(event: string, ...args: any[]): void;
}
//# sourceMappingURL=RTCPEvents.d.ts.map