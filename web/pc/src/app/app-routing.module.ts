import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesignComponent} from './pages/design/design.component';
import {HomeComponent} from './pages/home/home.component';
import {WelcomeComponent} from './pages/welcome/welcome.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/design'},
  {path: 'design', component: DesignComponent},
  {path: 'home', component: HomeComponent},
  {path: 'welcome', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
