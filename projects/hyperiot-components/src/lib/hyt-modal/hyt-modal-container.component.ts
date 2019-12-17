import {
  Component,
  OnInit,
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  Type,
  AfterViewInit,
  OnDestroy,
  ComponentRef,
  ViewEncapsulation
} from '@angular/core';
import { HytModalRef } from './hyt-modal-ref';
import { HytModalContentDirective } from './hyt-modal-content.directive';
import { Subject } from 'rxjs';
import { HytModal } from './hyt-modal';

@Component({
  selector: 'lib-hyt-modal-container',
  templateUrl: './hyt-modal-container.component.html',
  styleUrls: ['./hyt-modal-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HytModalContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(HytModalContentDirective, {static: true}) hytModalContent: HytModalContentDirective;

  componentRef: ComponentRef<any>;

  childComponent: HytModalRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadChildComponent(this.childComponent.component);
  }

  ngAfterViewInit() {}

  loadChildComponent(componentType: Type<HytModal>) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const viewContainerRef = this.hytModalContent.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close(event) {
    this.childComponent.close(event);
  }

  onOverlayClicked(evt: MouseEvent) {
    this.close(evt);
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }


}
