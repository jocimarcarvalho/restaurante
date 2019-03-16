import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../restaurants/restaurants.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu-item/menu-item.model';


@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  menu: Observable<MenuItem[]>
  constructor(private restaurantService: RestaurantService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // Aqui vamos pegar uma referência para o menu
    //Lembrando que vamos acessá-lo pelo compnente pai então devemos utilizar o
    // 'parent' e passar o 'id' do componente pai
    this.menu = this.restaurantService
    .menuOfRestaurant(this.route.parent.snapshot.params['id'])
  }
  addMenuItem(item: MenuItem){
    console.log(item)
  }
}
