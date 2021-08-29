import { Component, OnInit } from '@angular/core';
import { SignalrStringToolsHubService } from 'src/app/services/signalr-stringtoolshub-service';

@Component({
  selector: 'app-string-tools',
  templateUrl: './string-tools.component.html',
  styleUrls: ['./string-tools.component.css']
})
export class StringToolsComponent implements OnInit {

  firstName: string | undefined = '';
  lastName: string | undefined = '';
  fullName: string | undefined = '';
  finalName: string | undefined = '';

  constructor(private signalrStringToolsHubService: SignalrStringToolsHubService) { }

  ngOnInit(): void {
    this.signalrStringToolsHubService.startConnection();
    this.signalrStringToolsHubService.addTransferNotifyFullNameDataListener();
    this.signalrStringToolsHubService.viewFullName();
    this.signalrStringToolsHubService.getFinalName().subscribe(value => {
      this.finalName = value;
    });
  }

  retrieveFullName() {
    this.signalrStringToolsHubService.sendFirstAndLastName(this.firstName, this.lastName);
    this.signalrStringToolsHubService.getFullName().subscribe(value => {
      this.fullName = value;
    });
    this.signalrStringToolsHubService.startConnection();
    this.signalrStringToolsHubService.addTransferNotifyFullNameDataListener();
  }
}
