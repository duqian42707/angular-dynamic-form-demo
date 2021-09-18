import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableWidgetComponent} from './table-widget/table-widget.component';
import {DelonFormModule, WidgetRegistry} from '@delon/form';
import {DelonABCModule} from '@delon/abc';
import {Table2WidgetComponent} from './table2-widget/table2-widget.component';
import {NzTableModule} from 'ng-zorro-antd';

const CUSTOM_WIDGETS = [
  TableWidgetComponent,
  Table2WidgetComponent
];

@NgModule({
  declarations: [...CUSTOM_WIDGETS,],
  entryComponents: [...CUSTOM_WIDGETS],
  imports: [
    CommonModule,
    DelonFormModule.forRoot(),
    DelonABCModule,
    NzTableModule
  ],
  exports: [...CUSTOM_WIDGETS]
})
export class WidgetModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(TableWidgetComponent.KEY, TableWidgetComponent);
    widgetRegistry.register(Table2WidgetComponent.KEY, Table2WidgetComponent);
  }
}
