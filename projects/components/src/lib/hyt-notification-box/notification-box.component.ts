import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { Notification, NotificationType, NotifyPosition } from './models/notification.model';

import { NotificationService } from './services/notification.service';

@Component({
  selector: 'hyt-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class HytNotificationBoxComponent implements OnInit, AfterViewInit {

  
  @ViewChild('containerNotify', { static: false }) containerNotify: ElementRef;

  @Input('notify-position') notifyPosition: string = 'notify-top-right';

  @Input('is-timed') isTimed: boolean = true;

  @Input('time-to-expire-in-ms') timeToExpire: number = 4000;

  @Input('append-to') appendTo: string = null;

  notifications: Notification[] = [];

  constructor(
    public notificationService: NotificationService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    if (!(this.notifyPosition in NotifyPosition)) {
      this.notifyPosition = 'notify-top-right';
    }
  
    this.notificationService.getAlert().subscribe((alert: Notification) => {
      
      this.notifications = [];  

      if (!alert) {  
          this.notifications = [];  
          return;  
      }  

      this.notifications.push(alert);

      if(this.isTimed) {
        this.timeToExpire = !isNaN(+this.timeToExpire) ? this.timeToExpire : 4000
        setTimeout(() => {  
          this.notifications = this.notifications.filter(x => x !== alert);  
        }, this.timeToExpire);
      }

    }); 

  }

  ngAfterViewInit() {
    
    this.renderer.appendChild(document.body, this.containerNotify.nativeElement);
    
  }

  removeNotification(notification: Notification) {  
    this.notifications = this.notifications.filter(x => x !== notification);  
  } 

  /**Set css class for Alert -- Called from alert component**/      
  setCssClass(notification: Notification) {  

    if (!notification) {  
      return;  
    }  

    switch (notification.type) {  

      case NotificationType.Success:  
          return 'notify-success'; 

      case NotificationType.Error:  
          return 'notify-error'; 

      case NotificationType.Info:  
          return 'notify-info';  

      case NotificationType.Warning:  
          return 'notify-warning';  

    }  
  }

}
