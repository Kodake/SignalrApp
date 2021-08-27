import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-rservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FrontEnd';
  counter: number | undefined;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.signalRService.viewPage();
    this.signalRService.getCounter().subscribe(value => {
      this.counter = value;
    });
  }
}
