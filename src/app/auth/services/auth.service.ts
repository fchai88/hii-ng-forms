import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  currentUser: User = new User('', '', '', '');

  constructor(private router: Router) { }

  emailSignIn(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          this.storeToken();
          this.router.navigate(['/home']);
          resolve(res);
        },
         err => reject(err))
    });
  }

  registerUser(email: string, password: string, displayName: string) {
    return new Promise<any>((resolve,  reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          //setup display name (and any other user meta data)
          firebase.auth().currentUser.updateProfile({
            'displayName': displayName
          })
            .then(res => {
              this.storeToken();
              this.router.navigate(['/home']);
              resolve(res);
            }, err => reject(err));
        }, err => reject(err))
    })
  }

  signOutUser() {
    firebase.auth().signOut();
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/auth/signin']);
  }

  storeToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          localStorage.setItem('token', this.token);
        }
      );
  }

  setUser() {
    let user = firebase.auth().currentUser;
    this.currentUser.id = user.uid;
    this.currentUser.displayName = user.displayName;
    this.currentUser.email = user.email;
    this.currentUser.token = this.getToken();
  }

  getUser(): User {
    return this.currentUser;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    this.token = this.getToken();
    return this.token != null;
  }
}
