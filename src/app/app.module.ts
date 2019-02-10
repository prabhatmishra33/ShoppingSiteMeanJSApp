import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { AppRouter } from './app.route';

//import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shopping-list/shoping.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserTransferStateModule } from '@angular/platform-browser';
 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId : 'my-app' }),
    BrowserTransferStateModule,
    AppRouter,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule,
    AuthModule,
    ShopModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
