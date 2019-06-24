import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HyperIOT Components';

  items = [
    {
      title: 'Forms',
      expanded: true,
      children: [
        {
          title: 'Inputs',
          link: [],
        },
        {
          title: 'Buttons',
          link: [],
        }
      ],
    },
    {
      title: 'Cards',
      link: [],
    },
    {
      title: 'UI Elements',
      link: [],
      children: [
        {
          title: 'Actions',
          link: [],
        },
        {
          title: 'Stepper',
          link: [],
        }
      ],
    },
    {
      title: 'Tables',
      link: [],
    }
  ];
}
