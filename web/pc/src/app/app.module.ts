import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {PagesModule} from './pages/pages.module';
import {DelonFormConfig} from '@delon/form';

registerLocaleData(zh);

// 动态表单全局配置：https://ng-alain.com/version/8.x/form/getting-started/zh
export function fnDelonFormConfig(): DelonFormConfig {
  return Object.assign(new DelonFormConfig(), {
    autocomplete: 'off',
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: DelonFormConfig, useFactory: fnDelonFormConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
