import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  click(fruit: any): void {
    console.log('click', fruit);
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
