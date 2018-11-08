



import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthRouter } from './auth-route';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRouter
      
  ]
})
export class AuthModule { }
