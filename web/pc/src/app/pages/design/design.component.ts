import {Component, OnInit, ViewChild} from '@angular/core';
import {STColumn, STComponent} from '@delon/abc';
import {NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SFSchema} from '@delon/form';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.less']
})
export class DesignComponent implements OnInit {
  url = '/api/formDesign/query';
  columns: STColumn[] = [
    {title: '编号', index: 'formId', width: 80},
    {title: '名称', index: 'formName'},
    {title: '创建时间', type: 'date', index: 'createDate'},
    {title: '修改时间', type: 'date', index: 'lastModifiedDate'},
    {
      title: '操作', buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          click: (record, modal) => {
            this.openModal(record);
          },
        },
      ]
    },
  ];
  @ViewChild('st', {static: false}) stcomp: STComponent;

  demoSchemaStr = `{"properties":{"name":{"type":"string","title":"姓名","minLength":2,"ui":{"grid":{"span":8}}},"email":{"type":"string","title":"邮箱","format":"email","maxLength":20,"ui":{"grid":{"span":8}}},"url":{"type":"string","title":"链接","ui":{"addOnBefore":"https://","grid":{"span":8}}},"birthday":{"type":"string","title":"生日","ui":{"widget":"date","width":200,"grid":{"span":8}}},"age":{"type":"integer","title":"年龄","ui":{"widget":"number","width":200,"grid":{"span":8}}},"hobby":{"type":"string","title":"爱好","enum":[{"label":"打篮球","value":"basketball"},{"label":"踢足球","value":"football"},{"label":"打乒乓球","value":"pingpong"}],"default":["pingpong"],"ui":{"widget":"select","mode":"tags","grid":{"span":8}}},"table":{"type":"string","title":"表格1","ui":{"widget":"table","grid":{"span":12}}},"table2":{"type":"string","title":"表格2","ui":{"widget":"table2","grid":{"span":12}}}},"ui":{"grid":{"gutter":10}}}`;


  editModal = {
    visible: false,
    title: '表单设计',
  };
  schema: SFSchema;
  validateForm: FormGroup;

  constructor(private message: NzMessageService,
              private fb: FormBuilder,
              private http: HttpClient) {
    this.validateForm = this.fb.group({
      formId: [null],
      formName: [null, [Validators.required]],
      infoStr: [null],
    });
  }

  ngOnInit() {
  }


  openModal(data?) {
    this.validateForm.reset();
    if (data) {
      this.validateForm.patchValue(data);
      this.validateForm.patchValue({infoStr: JSON.stringify(data.info)});
    }
    this.editModal.visible = true;
    this.run();
  }

  loadDemoSchema() {
    this.validateForm.patchValue({infoStr: this.demoSchemaStr});
    this.run();
  }


  // 渲染动态表单
  run() {
    this.schema = JSON.parse(this.validateForm.value.infoStr);
  }

  handleOk() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    const data = this.validateForm.getRawValue();
    data.info = this.schema;
    this.http.post('/api/formDesign/save', data).subscribe((res: any) => {
      this.editModal.visible = false;
      this.stcomp.reload();
    });
  }


}
