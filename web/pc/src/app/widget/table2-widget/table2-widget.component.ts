import {Component, OnInit} from '@angular/core';
import {STColumn} from '@delon/abc/table';
import {ControlWidget} from '@delon/form';

@Component({
  selector: 'app-table2-widget',
  templateUrl: './table2-widget.component.html',
  styleUrls: ['./table2-widget.component.less']
})
export class Table2WidgetComponent extends ControlWidget implements OnInit {

  /* 用于注册小部件 KEY 值 */
  static readonly KEY = 'table2';


  // 组件所需要的参数，建议使用 `ngOnInit` 获取
  config: any;
  loadingTip: string;
  columns: STColumn[] = [
    {
      title: '编号',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: '小于25岁',
          select: data => data.forEach(item => (item.checked = item.age < 25)),
        },
        {
          text: '大于25岁',
          select: data => data.forEach(item => (item.checked = item.age >= 25)),
        },
      ],
    },
    {
      title: '姓名',
      index: 'name',
      sort: {
        compare: (a, b) => a.name.length - b.name.length,
      },
      filter: {
        type: 'keyword',
        fn: (filter, record) => !filter.value || record.name.indexOf(filter.value) !== -1,
      },
    },
    {
      title: '年龄',
      index: 'age',
      sort: {
        compare: (a, b) => a.age - b.age,
      },
      filter: {
        menus: [{text: '20岁以下', value: [0, 20]}, {text: '20-25岁', value: [20, 25]}, {text: '25岁以上', value: [25, 100]}],
        fn: (filter, record) => record.age >= filter.value[0] && record.age <= filter.value[1],
        multiple: false,
      },
    },
    {
      title: '状态',
      type: 'badge',
      index: 'status',
      badge: {
        1: {text: 'Success', color: 'success'},
        2: {text: 'Error', color: 'error'},
        3: {text: 'Processing', color: 'processing'},
        4: {text: 'Default', color: 'default'},
        5: {text: 'Warning', color: 'warning'},
      },
    },
  ];

  ngOnInit(): void {
    this.loadingTip = this.ui.loadingTip || '加载中……';
    this.config = this.ui.config || {};
  }

  // reset 可以更好的解决表单重置过程中所需要的新数据问题
  reset(value: any[]) {

  }

  change(value: any[]) {
    if (this.ui.change) {
      this.ui.change(value);
    }
    this.setValue(value);
  }


}
