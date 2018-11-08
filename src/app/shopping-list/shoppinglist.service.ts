import { Ingredients } from './../shared/ingredient.model';
// import { EventEmitter } from '@angular/core';

import { Subject } from 'rxjs';

export class ShoppingService{
    // IngredientsChanged  = new EventEmitter<Ingredients[]>();
    IngredientsChanged = new Subject<Ingredients[]>();
    startEditing = new Subject<number>();
    private indList = [
        new Ingredients('Ingredient-1','details-of-Ingredient1',10),
        new Ingredients('Ingredient-2','details-of-Ingredient2',20)
      ];

    getIngredients(){
        return this.indList.slice();    //sends a copy of list and event emitter is required 
        //to return again the copy when the lists gets updated //(method 2) return the indList from getIngredients
    }

    getIngredientsById(index:number){
        return this.indList[index];  
       
    }

    addItemToShop(item : Ingredients){
        this.indList.push(item);
        this.IngredientsChanged.next(this.getIngredients());
    }

    addItemsToShop(items : Ingredients[]){
        this.indList.push(...items);
        this.IngredientsChanged.next(this.getIngredients());
    }

    updateIngredientsById(Indg:Ingredients , index:number){
        this.indList[index] = Indg;
        this.IngredientsChanged.next(this.getIngredients());
    }

    delIngredients(index:number){
        this.indList.splice(index,1);
        this.IngredientsChanged.next(this.getIngredients());
    }
    
}