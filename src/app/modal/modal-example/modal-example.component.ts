import { Component, OnInit, Injector } from '@angular/core';
import { HytModalRef } from 'projects/hyperiot-components/src/lib/hyt-modal/hyt-modal-ref';
import { Subject, Observable, Subscriber } from 'rxjs';
import { HytModalService } from 'projects/hyperiot-components/src/lib/hyt-modal/hyt-modal.service';
import { HytModal } from 'projects/hyperiot-components/src/lib/hyt-modal/hyt-modal';

@Component({
  selector: 'app-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss']
})
export class ModalExampleComponent extends HytModal implements OnInit {


  constructor(hytModalService: HytModalService) {
    super(hytModalService);
  }

  ngOnInit() {
  }

}
