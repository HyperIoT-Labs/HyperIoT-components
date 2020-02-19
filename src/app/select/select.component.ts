import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Logger, LoggerService } from '@hyperiot/core';
import { SelectOption, SelectOptionGroup } from '../../../projects/components/src/lib/hyt-select/hyt-select.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  /** Selected element */
  selected: any;

  form: FormGroup;

  private logger: Logger;

  /** Select options */
  options: SelectOption[] = [
    { label: 'None' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza', disabled: true },
    { value: 'tacos-2', label: 'Tacos', disabled: false },
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
    private fb: FormBuilder,
    private loggerService: LoggerService
  ) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('SelectComponent');
  }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event) {
    this.logger.debug('onChange method called:', event);
  }

  submit() { }
}
