import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DispositionConst } from '../../consts/disposition.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  private Interval: any;
  departs = [];
  dataAllCalls = [];
  dataAllEmployes = [];
  dataAllUniqueNumbers = [];
  max: number = 150;
  showStat: boolean = false;
  countAll: number = 0;
  isNewCall: number = 0;
  isNewCallPercent: number = 0;
  countUniqueNumbers: number = 0;
  outgoingSuccessCount: number = 0;
  outgoingUnSuccessCount: number = 0;
  countLostCalls: number = 0;

  constructor(private callService: CallsService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAllCalls('Поступившие');
    this.getAllEmployes();
    this.getCountLostCalls();
    //this.callService.getIncomingCallsForPeriod();
  }

  toggle(): void {
    this.max += 150;
  }

  getStat() {
    this.showStat = !this.showStat;
  }

  tabSelected(event: any) {
    let tabIndex: number = event.index;
    this.dataAllCalls = [];
    this.Interval = setTimeout(() => {
      this.getAllCalls(tabIndex);
    }, 1000);
  }

  getAllCalls(tabText) {
    this.max = 150;
    let url: string;
    this.showStat = false;
    this.isNewCall = 0;
    this.dataAllUniqueNumbers = [];
    this.dataAllCalls = [];
    this.outgoingSuccessCount = 0;
    this.outgoingUnSuccessCount = 0;
    switch (tabText) {
      case 0: {
        url = './assets/json/incoming-calls-for-period.json';
        break;
      }
      case 1: {
        url = './assets/json/outgoing-calls-for-period.json';
        break;
      }
      case 2: {
        url = './assets/json/list-of-lost-calls-today.json';
        break;
      }
      default: {
        url = './assets/json/incoming-calls-for-period.json';
        break;
      }
    }
    this.callService.getAllCalls(url).subscribe(data => {
        for (let key in data.callDetails) {
          this.dataAllCalls.push(data.callDetails[key]);
          if (data.callDetails[key].isNewCall === '1')
            this.isNewCall += 1;
          if (this.dataAllUniqueNumbers.indexOf(data.callDetails[key].externalNumber) === -1)
            this.dataAllUniqueNumbers.push(data.callDetails[key].externalNumber);
          if (DispositionConst.SUCCESSDESPOS.indexOf(data.callDetails[key].disposition) !== -1)
            this.outgoingSuccessCount += 1;
          if (DispositionConst.UNSUCCESSDESPOS.indexOf(data.callDetails[key].disposition) !== -1)
            this.outgoingUnSuccessCount += 1;
        }
        this.countAll = this.dataAllCalls.length;
        this.countUniqueNumbers = this.dataAllUniqueNumbers.length;
        let callPerc: string = (this.isNewCall / this.countUniqueNumbers * 100).toFixed(2);
        this.isNewCallPercent = parseFloat(callPerc);

      });
  }

  getAllEmployes() {
    this.callService.getAllEmployes().subscribe(data => {
      for (let key in data.listOfEmployees) {
        this.dataAllEmployes.push(data.listOfEmployees[key]);
      }
      for (var i = 0; i < this.dataAllEmployes.length; i++) {
       if ((this.departs.indexOf(this.dataAllEmployes[i].department) === -1) && (this.dataAllEmployes[i].department !== '')) {
         this.departs.push(this.dataAllEmployes[i].department);
       }
      }
    });
  }

  getCountLostCalls() {
    let tempArray = [];
    this.callService.getLostCalls().subscribe(data => {
      for (let key in data.callDetails) {
        tempArray.push(data.callDetails[key]);
      }
      this.countLostCalls = tempArray.length;
    });
  }

  ngOnDestroy() {
    clearInterval(this.Interval);
  }

}
