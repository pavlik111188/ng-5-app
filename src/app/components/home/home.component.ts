import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CallsService } from '../../services/calls.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
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

  constructor(private callService: CallsService) { }

  ngOnInit() {
    this.getAllCalls();
    this.getAllEmployes();
  }

  toggle(): void {
    this.max += 150;
  }

  getStat() {
    this.showStat = !this.showStat;
  }

  getAllCalls() {
    this.isNewCall = 0;
    if (this.dataAllCalls.length === 0) {
      this.callService.getAllCalls().subscribe(data => {
        for (let key in data.callDetails) {
          this.dataAllCalls.push(data.callDetails[key]);
          if (data.callDetails[key].isNewCall === '1')
            this.isNewCall += 1;
          if (this.dataAllUniqueNumbers.indexOf(data.callDetails[key].externalNumber) === -1)
            this.dataAllUniqueNumbers.push(data.callDetails[key].externalNumber);
        }
        this.countAll = this.dataAllCalls.length;
        this.countUniqueNumbers = this.dataAllUniqueNumbers.length;
        this.isNewCallPercent = (this.isNewCall / this.countUniqueNumbers * 100).toFixed(2);
        console.log(this.dataAllCalls);
        console.log(this.dataAllUniqueNumbers);
      });
    }
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

}
