import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patternValidator } from '../../shared/pattern-validator';
import { FileService } from '../../services/file.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  moduleId: module.id,
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  animations: [

    trigger('showSuccess', [
      transition('* => goAnimate', [
      	query('.material-icons, .success .material-icons', style({ opacity: 0 })),
        query('.material-icons, .success .material-icons', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'rotate(0deg) scaleX(1.00) scaleY(1.00)'}),
            style({opacity: .1, transform: 'rotate(-3deg) scaleX(0.80) scaleY(0.80)'}),
            style({opacity: .2, transform: 'rotate(-3deg) scaleX(0.80) scaleY(0.80)'}),
            style({opacity: .3, transform: 'rotate(3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .4, transform: 'rotate(-3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .5, transform: 'rotate(3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .6, transform: 'rotate(-3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .7, transform: 'rotate(3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .8, transform: 'rotate(-3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: .9, transform: 'rotate(3deg) scaleX(1.20) scaleY(1.20)'}),
            style({opacity: 1, transform: 'rotate(0deg) scaleX(1.20) scaleY(1.20)'}),
          ]))]), {optional: true}),
        /*query('mat-card', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true})
          ,*/
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ]),

  ],
  encapsulation: ViewEncapsulation.None
})
export class FileComponent implements OnInit {

	callDate: string = '';
	filename: string = '';
	callType: string = '';
	customerNumber: string = '';
	id: string = '';
	link: string = '';
	save_file: string = '';
	audio_src: string = '';
	email: string = '';
	sendForm: FormGroup;
	showError: boolean = false;
	goals = ['My first life goal', 'I want to climb a mountain', 'Go ice skiing'];
	showPreload: boolean = false;
	isSuccess: boolean = false;
	exp = '';
	private Interval: any;

	constructor(private router: ActivatedRoute, private fileService: FileService) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
			this.callDate = params.callDate;
			this.callType = params.callType;
			this.customerNumber = params.customerNumber;
			this.id = params.id;
			this.filename = this.callDate.split('_')[1] + '_' + this.callDate.split('_')[0] + '_' + this.customerNumber + '_' + this.callType;
			this.save_file = 'https://my.binotel.ua//?module=cdrs&action=generateFile&fileName=' + this.id + '.mp3&callDate=' + this.callDate + '&customerNumber=' + this.customerNumber + '&callType=' + this.callType + '&download-filename=' + this.filename + '.mp3';
		  	this.audio_src = 'https://my.binotel.ua/?module=cdrs&action=generateFile&fileName=' + this.id + '.mp3&callDate=' + this.callDate + '&customerNumber=' + this.customerNumber + '&callType=' + this.callType;
		  	this.createForm();
		});
	}

	private createForm() {
	    this.sendForm = new FormGroup({
	      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
	    });
	}

	postToEmail() {
		this.showPreload = true;
		this.fileService.postToEmail(this.sendForm.value.email, this.id).subscribe(
			(res) => {
				this.isSuccess = true;
				this.exp = 'goAnimate';
				this.showPreload = false;
				this.sendForm.reset();
				this.Interval = setTimeout(() => {
		        	this.isSuccess = false;
		        	this.exp = '';
		        }, 3000);
			},
			(error) => {

			});
	}

	goAnimate() {
		this.exp = 'goAnimate';
	}

}
