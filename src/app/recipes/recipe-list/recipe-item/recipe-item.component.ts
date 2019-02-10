import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../../recipes.model'
import { RecipeService } from './../../recipe.service';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations:[
    trigger('animateFoodItems',[

      transition('void => *',[
        style({
          opacity:0,
          transform : 'translateX(-100px)'
        }),
        animate(300)
      ])
    ])
  ]
})
export class RecipeItemComponent implements OnInit {
  @Input() item : Recipe;
  @Input() index : number;
  constructor(private recipeSer:RecipeService) { }

  ngOnInit() {
  }

}
