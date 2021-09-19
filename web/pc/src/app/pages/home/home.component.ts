import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {STColumn, STComponent} from '@delon/abc';
import {SFSchema} from '@delon/form';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  selectFormId: string;
  selectFormDesign;
  formDesignList = [];
  columns: STColumn[] = [
    {title: 'id', index: 'id'},
    {title: 'formId', index: 'formId'},
    {title: '创建时间', type: 'date', index: 'createDate'},
    {title: '修改时间', type: 'date', index: 'lastModifiedDate'},
    {
      title: '操作', buttons: [
        {
          text: '详情',
          icon: 'file',
          type: 'modal',
          click: (record, modal) => {
            this.openModal(record);
          },
        },
      ]
    },
  ];

  data: any = [];
  @ViewChild('st', {static: false}) stcomp: STComponent;

  editModal = {
    visible: false,
    title: '填写表单',
  };
  schema: SFSchema;
  validateForm: FormGroup;
  formData = {};

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      id: [null],
      formId: [null],
      info: [null],
    });
  }

  ngOnInit() {
    this.queryFormDesignList();
  }

  queryFormDesignList() {
    this.http.get('/api/formDesign/all').subscribe((res: any) => {
      this.formDesignList = res;
    });
  }

  selectedFormChange(formId) {
    this.data = '/api/formData/query?formId=' + this.selectFormId;
    this.selectFormDesign = this.formDesignList.find(i => i.formId === formId);
    this.schema = this.selectFormDesign.info;
  }


  openModal(data?) {
    this.validateForm.reset();
    if (data) {
      this.validateForm.patchValue(data);
      this.formData = data.info;
    }
    this.validateForm.patchValue({formId: this.selectFormId});
    this.editModal.visible = true;
  }

  formDataChange(data) {
    this.validateForm.patchValue({info: data});
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
    this.http.post('/api/formData/save', data).subscribe((res: any) => {
      this.editModal.visible = false;
      this.stcomp.reload();
    });
  }


}
