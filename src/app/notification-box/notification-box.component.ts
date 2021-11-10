import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'projects/components/src/lib/hyt-notification-box/services/notification.service';

@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss']
})
export class NotificationBoxComponent implements OnInit {

  constructor(private notificationservice: NotificationService) { }

  ngOnInit(): void {
  }

  createSuccessNotification() {
    this.notificationservice.success('titolo', 'Corpo del messaggio')
  }

  createInfoNotification() {
    this.notificationservice.info('titolo', 'Corpo del messaggio')
  }

  createWarningNotification() {
    this.notificationservice.warn('titolo', 'Corpo del messaggio')
  }

  createErrorNotification() {
    this.notificationservice.error('titolo', 'Corpo del messaggio')
  }

  clearNotification() {
    this.notificationservice.clear()
  }

}
