import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  departs = [
    'АО - Административный отдел', 'ОП - команда Альфа', 'ОП - команда Ярослава Билодида', 'Отдел Качества', 'Отдел продаж', 'Отдел техподдержки', 'ОТП | Отдел приёма обращений'
  ];

  constructor() { }

  ngOnInit() {
  }

}
