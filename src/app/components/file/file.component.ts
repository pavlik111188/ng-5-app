import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../../services/file.service';

@Component({
  moduleId: module.id,
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FileComponent implements OnInit {

	callDate: string = '';
	callType: string = '';
	customerNumber: string = '';
	id: string = '';
	link: string = '';
	link_hear: string = '';
	audio_src: string = '';
	email: string = '';
	showError: boolean = false;

	constructor(private router: ActivatedRoute, private fileService: FileService) { }

	ngOnInit() {
		this.router.params.subscribe(params => {
			this.callDate = params.callDate;
			this.callType = params.callType;
			this.customerNumber = params.customerNumber;
			this.id = params.id;
			this.link_hear = 'https://my.binotel.ua/?module=cdrs&action=generateFile&fileName=' + this.id + '.mp3&callDate=' + this.callDate + '&customerNumber=' + this.customerNumber + '&callType=' + this.callType;
		  	this.audio_src = 'https://my.binotel.ua/?module=cdrs&action=generateFile&fileName=' + this.id + '.mp3&callDate=' + this.callDate + '&customerNumber=' + this.customerNumber + '&callType=' + this.callType;
		  	console.log(params);
		  	//this.postToEmail();
		});
	}

	postToEmail() {
		
		/*this.fileService.postToEmail(this.email, this.id).subscribe(res => {

		});*/
	}

}
