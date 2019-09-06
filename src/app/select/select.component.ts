import { Component, OnInit } from '@angular/core';
import { SelectOption, SelectOptionGroup } from '../../../projects/hyperiot-components/src/lib/hyt-select/hyt-select.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  /** Selected element */
  selected: any;

  form: FormGroup;

  /** Select options */
  options: SelectOption[] = [
    { label: 'None' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
  ];

  pokemonGroups: SelectOptionGroup[] = [
    {
      name: 'Grass',
      options: [
        { value: 'bulbasaur-0', label: 'Bulbasaur' },
        { value: 'oddish-1', label: 'Oddish' },
        { value: 'bellsprout-2', label: 'Bellsprout' }
      ]
    },
    {
      name: 'Water',
      options: [
        { value: 'squirtle-3', label: 'Squirtle' },
        { value: 'psyduck-4', label: 'Psyduck' },
        { value: 'horsea-5', label: 'Horsea' }
      ]
    },
    {
      name: 'Fire',
      disabled: true,
      options: [
        { value: 'charmander-6', label: 'Charmander' },
        { value: 'vulpix-7', label: 'Vulpix' },
        { value: 'flareon-8', label: 'Flareon' }
      ]
    },
    {
      name: 'Psychic',
      options: [
        { value: 'mew-9', label: 'Mew' },
        { value: 'mewtwo-10', label: 'Mewtwo' },
      ]
    }
  ];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event) {
    console.log('__onChange called');
    console.log(event);
  }

  submit() { }
}
