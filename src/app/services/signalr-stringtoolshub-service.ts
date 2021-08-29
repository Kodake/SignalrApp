import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignalrStringToolsHubService {

    fullName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    finalName$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor() { }

    private hubConnection: signalR.HubConnection | undefined;

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44362/hub/stringtools', {
                transport: signalR.HttpTransportType.WebSockets |
                    signalR.HttpTransportType.ServerSentEvents
            })
            .build();
        this.hubConnection
            .start()
            .then(() => this.notify())
            .then(() => console.log('Connection established'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    public addTransferNotifyFullNameDataListener = () => {
        this.hubConnection?.on('notifyFullName', (data) => {
            console.log(data);
        });
    }

    // StringToolsHub

    public sendFirstAndLastName(firstName: string | undefined, lastName: string | undefined) {
        this.hubConnection?.invoke("getFullName", firstName, lastName)
            .then((fullName: string) => this.setFullName(fullName));
    }

    public viewFullName() {
        this.hubConnection?.on("viewFullNameUpdate", (value: string) => {
            this.setFinalName(value);
        });
    }

    setFinalName(finalName: string) {
        this.finalName$.next(finalName);
    }

    getFinalName() {
        return this.finalName$;
    }

    setFullName(fullName: string) {
        this.fullName$.next(fullName);
    }

    getFullName() {
        return this.fullName$;
    }

    public notify() {
        this.hubConnection?.send("notifyFullName");
    }
}