import { Component, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'hyt-delete-confirm-dialog',
  templateUrl: './hyt-confirm-dialog.component.html',
  styleUrls: ['./hyt-confirm-dialog.component.scss']
})
export class HytConfirmDialogComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<HytConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @ViewChild(HTMLElement, { static: true }) public viewRef: ElementRef
  ) { }

  ngAfterViewInit() {
    const el: HTMLElement = this.viewRef.nativeElement;
    (el.querySelector('button[defaultButton]') as HTMLElement).focus();
  }

}
