import { Component, OnInit } from '@angular/core';
import { HytModalService } from 'projects/components/src/lib/hyt-modal/hyt-modal.service';
import { ModalExampleComponent } from './modal-example/modal-example.component';

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

    const ref = this.hytModalService.open(
      ModalExampleComponent,
      {
        message: 'I am a dynamic component inside of a dialog!'
      }
    );

    ref.onClosed.subscribe(result => {
      console.log('Dialog closed', result);
    },
      error => {
        console.log(error);
      },
      () => {
        console.log('closed');
      }
    );
  }

}
