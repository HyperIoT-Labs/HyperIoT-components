import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  formControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

  constructor(
  ) { }

  ngOnInit() {
  }

}
