import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-e',
  templateUrl: './modal-e.component.html',
  styleUrls: ['./modal-e.component.scss']
})
export class ModalEComponent implements OnInit {

  modalOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modalOpen = true;
  }

  close() {
    this.modalOpen = false;
  }

}
