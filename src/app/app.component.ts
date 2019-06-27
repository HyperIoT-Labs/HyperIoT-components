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
          link: ['/inputs'],
        },
        {
          title: 'Buttons',
          link: ['/buttons'],
        }
      ],
    },
    {
      title: 'UI Elements',
      link: [],
      children: [
        {
          title: 'Actions',
          link: ['/actions'],
        },
        {
          title: 'Stepper',
          link: ['/stepper'],
        }
      ],
    },
    {
      title: 'Cards',
      link: ['/cards'],
    },
    {
      title: 'Tables',
      link: [],
    }
  ];
}
