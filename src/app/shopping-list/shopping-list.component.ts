import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingService } from './shoppinglist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  indgList : Ingredients[];
  private  ingredietSubscription : Subscription;

  constructor(private shopServ : ShoppingService){
    
  }

  ngOnInit() {
    this.indgList = this.shopServ.getIngredients();
    this.ingredietSubscription = this.shopServ.IngredientsChanged.subscribe((indLists)=>{
      this.indgList = indLists;
    });

  }

  editItem(i:number){
    console.log(i);
    this.shopServ.startEditing.next(i);
  }

  ngOnDestroy(){
    this.ingredietSubscription.unsubscribe();
  }

}
