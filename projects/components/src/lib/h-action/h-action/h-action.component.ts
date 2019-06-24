import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NbComponentSize } from '@nebular/theme';

@Component({
  selector: 'h-action',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './h-action.component.html',
  styleUrls: ['./h-action.component.css']
})
export class HActionComponent implements OnInit {

  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  constructor() { }

  ngOnInit() {
  }

}
