import { Component } from '@angular/core';
import { version } from 'projects/components/package.json';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent {
  public version: string = version;

}
