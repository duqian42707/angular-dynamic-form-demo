import {Component, OnInit} from '@angular/core';
import {SFSchema} from '@delon/form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
        minLength: 2,
        ui: {
          grid: {
            span: 8
          }
        }
      },
      email: {
        type: 'string',
        title: '邮箱',
        format: 'email',
        maxLength: 20,
        ui: {
          grid: {
            span: 8
          }
        }
      },
      url: {
        type: 'string',
        title: '链接',
        ui: {
          addOnBefore: 'https://',
          grid: {
            span: 8
          }
        }
      },
      birthday: {
        type: 'string',
        title: '生日',
        ui: {
          widget: 'date',
          width: 200, // 不起作用？
          grid: {
            span: 8
          }
        }
      },
      age: {
        type: 'integer',
        title: '年龄',
        ui: {
          widget: 'number',
          width: 200, // 不起作用？
          grid: {
            span: 8
          }
        }
      },
      hobby: {
        type: 'string',
        title: '爱好',
        enum: [
          {label: '打篮球', value: 'basketball'},
          {label: '踢足球', value: 'football'},
          {label: '打乒乓球', value: 'pingpong'},
        ],
        default: ['pingpong'],
        ui: {
          widget: 'select',
          mode: 'tags',
          grid: {
            span: 8
          }
        }
      },
      table: {
        // todo type该如何写
        type: 'string',
        title: '表格1',
        ui: {
          widget: 'table',
          grid: {
            span: 12
          }
        }
      },
      table2: {
        // todo type该如何写
        type: 'string',
        title: '表格2',
        ui: {
          widget: 'table2',
          grid: {
            span: 12
          }
        }
      }
    },
    ui: {
      // spanLabelFixed: 100,
      grid: {
        gutter: 10
      }
    }
  };

  ui: {};

  formData: {};


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // this.loadMockData();
    this.queryData();
  }

  loadMockData() {
    this.formData = {
      name: '张三',
      email: 'dq@163.com',
      url: 'www.baidu.com',
      table: [
        {id: 1, name: '李四', age: 18, status: '正常'},
        {id: 2, name: '王五', age: 20, status: '正常'},
      ],
      table2: [
        {id: 1, name: '李四', age: 18, status: '正常'},
        {id: 2, name: '王五', age: 20, status: '正常'},
      ],
    };
  }

  queryData() {
    this.http.get(`/api/query`).subscribe((res: any) => {
      console.log(res);
      this.formData = res.info || {};
    });
  }

  submit(value: any) {
    console.log(value);
    this.http.post(`/api/save`, {id: null, info: value}).subscribe(res => {
      console.log(res);
    });
  }

  formChange(value: any) {
    console.log(value);
  }
}
