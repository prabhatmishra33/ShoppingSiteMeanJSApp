import { NgModule } from "@angular/core";
import { ShopRouter } from "./shoping-route";

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,

    ],
    imports:[
        HttpModule,
        CommonModule,
        FormsModule,
        ShopRouter
    ]
})


export class ShopModule{

}