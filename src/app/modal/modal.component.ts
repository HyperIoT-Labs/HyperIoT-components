import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

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
