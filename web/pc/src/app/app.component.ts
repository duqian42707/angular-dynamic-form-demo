import {Component} from '@angular/core';
import {NzIconService} from 'ng-zorro-antd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private nzIconService: NzIconService) {
    nzIconService.changeAssetsSource('https://image.dqv5.com/nzicons');
  }
}
