import { NgModule } from "@angular/core";
import { RouterModule , Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";


const shopRoute : Routes =[
    { path :'shop' ,component : ShoppingListComponent },
]



@NgModule({
    imports:[
        RouterModule.forChild(shopRoute)
    ],
    exports:[
        RouterModule
    ]
})

export class ShopRouter{

}