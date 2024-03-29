import { LoggedInGuard } from './security/loggedin.guard';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDatailComponent } from './restaurant-datail/restaurant-datail.component';
import { MenuComponent } from './restaurant-datail/menu/menu.component';
import { ReviewsComponent } from './restaurant-datail/reviews/reviews.component';
import { OrderSumaryComponent } from './order-sumary/order-sumary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'restaurants/:id', component: RestaurantDatailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'order', loadChildren: './order/order.module#OrderModule',
            canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
    {path: 'order-sumary', component: OrderSumaryComponent},
    {path: 'sobre', loadChildren: './about/about.module#AboutModule'},
    {path: '**', component: NotFoundComponent}
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);
/**
 * A rota de login com o 'to' serve para redirecionamento apa uma página específica
 * e precisa de um parâmetro para realizar esta ação. Este parâmetro é passado
 * pelo LoginComponent' através da string 'navigateTo'
 * 
 */