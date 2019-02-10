import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SharedModule } from "../shared/shared.module";
import { AppRouter } from "../app.route";

import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService  } from '../auth/auth.service';

import { ShoppingService } from '../shopping-list/shoppinglist.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../shared/auth.interceptor";
import { LogInterceptor } from "../shared/logging.interceptor";

import { HttpModule } from '@angular/http';
    

@NgModule({
    declarations:[
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        HttpModule,
        SharedModule,
        AppRouter
    ],
    exports:[
        HeaderComponent,
        AppRouter
    ],
    providers: [
        ShoppingService,
        RecipeService,
        DataStorageService,
        AuthService,
        { provide : HTTP_INTERCEPTORS , useClass : AuthInterceptor,multi:true },
        { provide : HTTP_INTERCEPTORS , useClass : LogInterceptor,multi:true }
    ],
  
})


export class CoreModule{

}