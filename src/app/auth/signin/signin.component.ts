import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  today: Date = new Date();
  submitted: boolean = false;
  errorMessage: string = "";

  email: string;
  password: string;

  login(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      //login process
      this.authService.emailSignIn(this.email, this.password)
        .then(res => {
          console.log(res);
          this.authService.setUser();
          this.errorMessage = "";
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
        });
    }
  }

}
