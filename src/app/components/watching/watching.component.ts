import { Component, OnInit } from '@angular/core';
import { SignalrViewHubService } from 'src/app/services/signalr-viewhub-service';

@Component({
  selector: 'app-watching',
  templateUrl: './watching.component.html',
  styleUrls: ['./watching.component.css']
})
export class WatchingComponent implements OnInit {

  counter: number | undefined;

  constructor(private signalrViewHubService: SignalrViewHubService) { }

  ngOnInit(): void {
    this.signalrViewHubService.startConnection();
    this.signalrViewHubService.addTransferNotifyWatchingtDataListener();
    this.signalrViewHubService.viewPage();
    this.signalrViewHubService.getCounter().subscribe(value => {
      this.counter = value;
    });
  }
}
