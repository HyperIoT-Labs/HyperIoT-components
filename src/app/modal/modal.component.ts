import { Component, OnInit } from '@angular/core';
import { HytModalService } from 'projects/hyperiot-components/src/lib/hyt-modal/hyt-modal.service';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { HytModalRef } from 'projects/hyperiot-components/src/lib/hyt-modal/hyt-modal-ref';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    private hytModalService: HytModalService
  ) { }

  ngOnInit() {
  }

  openModal() {

    const ref = this.hytModalService.open(ModalExampleComponent, { data: { message: 'I am a dynamic component inside of a dialog!' } });

    ref.onClosed.subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

}
