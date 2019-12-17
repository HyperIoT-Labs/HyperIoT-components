import { HytModalContainerComponent } from './hyt-modal-container.component';
import { Type, OnInit } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { HytModalService } from './hyt-modal.service';

export class HytModalRef implements OnInit {

    public onClosed = new Subject<any>();

    constructor(public component: Type<any>, private hytModalService: HytModalService, public data?: any) {}

    ngOnInit() {
    }

    close(data) {
        this.onClosed.next(data);
        this.hytModalService.close();
    }

}
