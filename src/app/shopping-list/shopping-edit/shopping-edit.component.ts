import { Component, OnInit ,ViewChild ,ElementRef, OnDestroy } from '@angular/core';
import { Ingredients } from '../../shared/ingredient.model';
import { ShoppingService } from './../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  editItemSubscription : Subscription;
  @ViewChild('f') shopForm : NgForm;
  editmode:boolean=false;
  indexOfItem:number;
  
  constructor(private shopServ : ShoppingService) { }
  //signupForm:NgForm
  ngOnInit() {
    this.editItemSubscription = this.shopServ.startEditing
      .subscribe( (i:number) =>{
        this.editmode=true
        console.log("Received Index to shop edit : "+i);
        let indgr = this.shopServ.getIngredientsById(i);
        this.shopForm.setValue({
          'itemName':indgr.itemName,
          'itemDecp':indgr.itemDescp,
          'itemPrice':indgr.itemPrice
        });
        this.indexOfItem=i;
      })
      
  }

  OnDeleteItem(){
    //console.log('DeleteItem');
    this.shopServ.delIngredients(this.indexOfItem);
    this.OnResetItem();
  }

  OnResetItem(){
      this.shopForm.reset();
      this.editmode=false;

  }

  onAddItem(form:NgForm){
    //console.log(form.value);
    if(this.editmode){
        this.shopServ.updateIngredientsById(new Ingredients(form.value.itemName,form.value.itemDecp,
          form.value.itemPrice),this.indexOfItem)
    }
    else{
      this.shopServ.addItemToShop(
        new Ingredients(form.value.itemName,form.value.itemDecp,
          form.value.itemPrice) );
  
    }
    form.reset();
    this.editmode=false;
  }


  ngOnDestroy(){
    this.shopServ.startEditing.unsubscribe;
  }

}
