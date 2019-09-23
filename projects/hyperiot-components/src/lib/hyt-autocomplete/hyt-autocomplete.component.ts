import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'hyt-autocomplete',
  templateUrl: './hyt-autocomplete.component.html',
  styleUrls: ['./hyt-autocomplete.component.scss']
})
export class HytAutocompleteComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor() { }

  ngOnInit() {
  }

}
