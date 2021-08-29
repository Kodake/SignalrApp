import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignalrChartHubService {

  salaries$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  private hubConnection: signalR.HubConnection | undefined;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44362/hub/chart', {
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

  public addTransferNotifyChartValuesDataListener = () => {
    this.hubConnection?.on('notifyChartValues', (data) => {
      console.log(data);
    });
  }

  public startHttpRequest = () => {
    this.http.get<number>('https://localhost:44362/api/Chart')
    .subscribe((values: any) => {
      this.setSalaries(values);
    })
  }

  // ChartHub

  public viewChartValues() {
    this.hubConnection?.on("getChartValues", (values: any) => {
      this.setSalaries(values);
    });
  }

  setSalaries(salaries: any) {
    this.salaries$.next(salaries);
  }

  getSalaries() {
    return this.salaries$;
  }

  public notify() {
    this.hubConnection?.send("notifyChartValues");
  }
}
