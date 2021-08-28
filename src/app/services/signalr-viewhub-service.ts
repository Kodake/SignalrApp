import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrViewHubService {

  counter$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  private hubConnection: signalR.HubConnection | undefined;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44362/hub/view', {
        transport: signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.ServerSentEvents
      })
      .build();
    this.hubConnection
      .start()
      .then(() => this.notify())
      .finally(() => console.log('Connection established'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferNotifyWatchingtDataListener = () => {
    this.hubConnection?.on('notifyWatching', (data) => {
      console.log(data);
    });
  }

  // ViewHub

  public viewPage() {
    this.hubConnection?.on("viewCountUpdate", (value: number) => {
      this.setCounter(value);
    });
  }

  setCounter(counter: number) {
    this.counter$.next(counter);
  }

  getCounter() {
    return this.counter$;
  }

  public notify() {
    this.hubConnection?.send("notifyWatching");
  }
}
