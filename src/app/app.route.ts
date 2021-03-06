import { NgModule } from "@angular/core";
import { Route, Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { HeaderComponent } from "./core/header/header.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent }  from "./auth/signup/signup.component";
import { SigninComponent }  from "./auth/signin/signin.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { HomeComponent } from "./core/home/home.component";



const appRoute : Routes = [
      
    { path : '' , component : HomeComponent},
    { path : 'recipes' , loadChildren : './recipes/recipes.module#RecipesModule'}
     
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoute,{ preloadingStrategy : PreloadAllModules })
    ],
    exports : [RouterModule]
})

export class AppRouter{

}