import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DispositionConst } from '../../consts/disposition.const';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

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
  outgoingSuccessCountPerc: number = 0;
  outgoingUnSuccessCountPerc: number = 0;
  countAllNewUnsuccessCalls: number = 0;
  averageAllCalls: number = 0;
  averageAllWaitCalls: number = 0;
  averageSuccessWaitCalls: number = 0;
  averageUnSuccessWaitCalls: number = 0;
  successDesp = DispositionConst.SUCCESSDESPOS;
  durationAllCalls: number = 0;
  durationAllWaitCalls: number = 0;
  Math: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private callService: CallsService, private authenticationService: AuthenticationService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.getAllCalls('Поступившие');
    this.getAllEmployes();
    this.getCountLostCalls();
    //this.prepareTelephoneNumberWithSpan('0443334444');
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
    this.countAllNewUnsuccessCalls = 0;
    this.countAll = 0;
    this.countUniqueNumbers = 0;
    this.isNewCallPercent = 0;
    this.outgoingSuccessCountPerc = 0;
    this.outgoingUnSuccessCountPerc = 0;
    this.durationAllCalls = 0;
    this.averageAllCalls = 0;
    this.averageAllWaitCalls = 0;
    this.durationAllWaitCalls = 0;
    this.averageSuccessWaitCalls = 0;
    this.averageUnSuccessWaitCalls = 0;
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
          this.durationAllCalls += parseInt(data.callDetails[key].billsec);
          this.durationAllWaitCalls += parseInt(data.callDetails[key].waitsec);
          if (data.callDetails[key].isNewCall === '1')
            this.isNewCall += 1;
          if (this.dataAllUniqueNumbers.indexOf(data.callDetails[key].externalNumber) === -1) 
            this.dataAllUniqueNumbers.push(data.callDetails[key].externalNumber);
          if (DispositionConst.SUCCESSDESPOS.indexOf(data.callDetails[key].disposition) !== -1) 
            this.outgoingSuccessCount += 1;
          if (DispositionConst.UNSUCCESSDESPOS.indexOf(data.callDetails[key].disposition) !== -1) {
            this.outgoingUnSuccessCount += 1;
            if (data.callDetails[key].isNewCall === '1')
              this.countAllNewUnsuccessCalls += 1;
          }
        }    
        this.countAll = this.dataAllCalls.length;
        this.countUniqueNumbers = this.dataAllUniqueNumbers.length;
        let callPerc: string = (this.isNewCall / this.countUniqueNumbers * 100).toFixed(2);
        this.isNewCallPercent = parseFloat(callPerc);
        this.outgoingSuccessCountPerc = parseFloat((this.outgoingSuccessCount / this.countAll * 100).toFixed(2));
        this.outgoingUnSuccessCountPerc = parseFloat((this.outgoingUnSuccessCount / this.countAll * 100).toFixed(2));
        this.averageAllCalls = parseFloat((this.durationAllCalls / this.outgoingSuccessCount).toFixed(0));
        this.averageAllWaitCalls = parseFloat((this.durationAllWaitCalls / this.countAll).toFixed(0));
        this.averageSuccessWaitCalls = parseFloat((this.durationAllWaitCalls / this.outgoingSuccessCount).toFixed(0));
        this.averageUnSuccessWaitCalls = parseFloat((this.durationAllWaitCalls / this.outgoingUnSuccessCount).toFixed(0));
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

  secondsToTime(timeSeconds: number) {
    let minutes = Math.floor(timeSeconds/60);
    let seconds = timeSeconds - (minutes*60);
    if (minutes < 60) {
      return (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    } else {
      let hours = Math.floor(minutes/60);
      minutes = minutes - (hours*60);
      return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
  }

  convertTimestamp(timestamp, type) {
      let d = new Date(timestamp * 1000),  // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),  // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),      // Add leading 0.
      hh = ('0' + d.getHours()).slice(-2),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),    // Add leading 0.
      ampm = 'AM',
      time;        
      if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
      } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
      } else if (hh == 0) {
        h = 12;
      }
      if (type == 'time') {
        time = h + ':' + min;
      }  else {
        time = dd + '.' + mm + '.' + yyyy;
      }        
      return time;     
  }

  prepareTelephoneNumberWithSpan(str: string) {
    if (str === 'onynomous') {
      str = 'Aonymous';
    }
    str = str.toString();
    //if (!isNaN(str)) {
      
      if (str.length === 7) {
        str = str.substring(0,3) + '<span class="space-before">' + str.substring(3,2) + '</span><span class="space-before">' + str.substring(5,2) + '</span>';
      } else if (str.length === 9) {
        str = str.substring(0,3) + '<span class="space-before">' + str.substring(3,3) + '</span><span class="space-before">' + str.substring(6,3) + '</span>';
      } else if (str.length === 10) {
        str = str.substring(0,3) + '<span class="space-before">' + str.substring(3,3) + '</span><span class="space-before">' + str.substring(6,2) + '</span><span class="space-before">' + str.substring(8,2) + '</span>';
      } else if (str.length >= 11) {
        if (str.substring(0,2) === '00' && str.length >= 12) {
          str = str.substring(0,2) + '<span class="space-before">' + str.substring(2,str.length-12) + '</span><span class="space-before">' + str.substring(-10,3) + '</span><span class="space-before">' + str.substring(-7,3) + '</span><span class="space-before">' + str.substring(-4,2) + '</span><span class="space-before">' + str.substring(-2,2) + '</span>';
        } else if (str.substring(0,3) === '810') {
          str = str.substring(0,3) + '<span class="space-before">' + str.substring(3,str.length-13) + '</span><span class="space-before">' + str.substring(-10,3) + '</span><span class="space-before">' + str.substring(-7,3) + '</span><span class="space-before">' + str.substring(-4,2) + '</span><span class="space-before">' + str.substring(-2,2) + '</span>';
        } else {
          str = str.substring(0,str.length-10) + '<span class="space-before">' + str.substring(-10, 3) + '</span><span class="space-before">' + str.substring(-7,3) + '</span><span class="space-before">' + str.substring(-4,2) + '</span><span class="space-before">' + str.substring(-2,2) + '</span>';
        }
      }
   // }
    /* SIM pair with A prefix */
    //if (!isNaN(str.substring(1))) {
     // str = str.toString();
      if (str.length === 11) {
        str = str.substring(0,1) + '<span class="space-before">' + str.substring(1,3) + '</span><span class="space-before">' + str.substring(4,3) + '</span><span class="space-before">' + str.substring(7,2) + '</span>' + '</span><span class="space-before">' + str.substring(9,2) + '</span>';
      }
      return str;
    //}
  }

  ngOnDestroy() {
    clearInterval(this.Interval);
  }

}
