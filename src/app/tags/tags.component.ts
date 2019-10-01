import { Component, OnInit, Input } from '@angular/core';
import { LoggerService, Logger } from '@hyperiot/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  private logger: Logger;

  fruits: any[] = [
    {
      name: 'Apple',
      color: 'basic'
    },
    {
      name: 'Banana',
      color: 'warn'
    },
    {
      name: 'Lemon',
      color: 'accent'
    },
    {
      name: 'Strawberry',
      color: 'primary'
    }
  ];

  constructor(private loggerService: LoggerService) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('TagsComponent');
   }

  ngOnInit() {
  }

  click(fruit: any): void {
    this.logger.debug('click method called', fruit);
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
