import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patternValidator } from '../../shared/pattern-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

	auth: Observable<any>;
	email: string = '';
	pass: string = '';
	loginForm: FormGroup;
	showError: boolean = false;

	constructor(private authenticationService: AuthenticationService, private router: Router) { }

	ngOnInit() {
		this.createForm();
	}

	private createForm() {
	    this.loginForm = new FormGroup({
	      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
	      password: new FormControl('', [Validators.required, patternValidator(/^.{10,}$/)]),
	    });
	}

	public login() {
		this.showError = false;
		this.authenticationService.auth(this.loginForm.value.email, this.loginForm.value.password)
		.subscribe(
			(res) => {		
			if (res == 'success') {
				this.router.navigate(['/']);
			} else {
				this.showError = true;
			}
		},
		(error) => {
			console.log('error');
		});
	}

}
