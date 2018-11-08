

import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRouter } from "./recipes-route";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
        
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RecipesRouter,
        SharedModule
    ]
})
export class RecipesModule{

}