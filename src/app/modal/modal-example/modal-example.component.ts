import { Component, OnInit } from '@angular/core';
import { HytModal } from 'projects/components/src/lib/hyt-modal/hyt-modal';
import { HytModalService } from 'projects/components/src/lib/hyt-modal/hyt-modal.service';

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
