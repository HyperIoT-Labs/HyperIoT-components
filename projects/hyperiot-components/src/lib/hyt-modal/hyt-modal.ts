import { Type } from '@angular/core';
import { HytModalService } from './hyt-modal.service';
import { HytModalRef } from './hyt-modal-ref';

export abstract class HytModal {

    protected hytModalref: HytModalRef;

    public data: any;

    constructor(private hytModalService: HytModalService) {
        this.hytModalref = this.hytModalService.modalRef;
        this.data = this.hytModalService.modalRef.data;
    }

    close(data) {
        this.hytModalref.close(data);
    }

}
