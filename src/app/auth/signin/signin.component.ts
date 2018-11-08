import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user
  signinSuccess=false;
  submit=false;
  constructor(private authServ : AuthService,private router:Router) { }

  ngOnInit() {
  }

  onSignIn(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    console.log(email);
    console.log(password);
    this.authServ.signInUser(email,password)
      .subscribe(
        
        (res)=>{
          this.submit=true;  
          console.log("Sign in Successfull");
          this.signinSuccess=true;
          this.user=res;
          console.log(this.user);
          this.authServ.setToken(res["token"]);
          var that = this;
          
          setTimeout(function(this){
            that.router.navigate(['/']);
          },1000);
          
        },
        (err)=>{
          this.submit=true;
          this.signinSuccess=false;
        }
      );
  }

}
