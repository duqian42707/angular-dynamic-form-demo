import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {DelonFormModule} from '@delon/form';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {WidgetModule} from '../widget/widget.module';
import {DelonABCModule} from '@delon/abc';
import {HttpClientModule} from '@angular/common/http';
import { DesignComponent } from './design/design.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [WelcomeComponent, DesignComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DelonFormModule.forRoot(),
    DelonABCModule,
    WidgetModule
  ]
})
export class PagesModule {
}
