import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SignalrStringToolsHubService } from './services/signalr-stringtoolshub-service';
import { SignalrViewHubService } from './services/signalr-viewhub-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FrontEnd';
  counter: number | undefined;
  firstName: string | undefined = '';
  lastName: string | undefined = '';
  fullName: string | undefined = '';
  finalName: string | undefined = '';

  constructor(private signalrViewHubService: SignalrViewHubService, private signalrStringToolsHubService: SignalrStringToolsHubService) { }

  ngOnInit(): void {
    this.signalrStringToolsHubService.startConnection();
    this.signalrStringToolsHubService.addTransferNotifyFullNameDataListener();
    this.signalrStringToolsHubService.viewFullName();
    this.signalrStringToolsHubService.getFinalName().subscribe(value => {
      this.finalName = value;
    });
    this.signalrViewHubService.startConnection();
    this.signalrViewHubService.addTransferNotifyWatchingtDataListener();
    this.signalrViewHubService.viewPage();
    this.signalrViewHubService.getCounter().subscribe(value => {
      this.counter = value;
    });
    
  }

  retrieveFullName(){
    this.signalrStringToolsHubService.sendFirstAndLastName(this.firstName, this.lastName);
    this.signalrStringToolsHubService.getFullName().subscribe(value => {
      this.fullName = value;
    });
    
    this.signalrStringToolsHubService.startConnection();
    this.signalrStringToolsHubService.addTransferNotifyFullNameDataListener();
    
  }
}
