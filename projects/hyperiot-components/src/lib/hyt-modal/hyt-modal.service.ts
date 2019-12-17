import {
  Injectable,
  Component,
  ComponentRef,
  Type,
  ComponentFactoryResolver,
  ApplicationRef,
  EmbeddedViewRef,
  Injector
} from '@angular/core';
import { HytModalRef } from './hyt-modal-ref';
import { HytModalContainerComponent } from './hyt-modal-container.component';

@Injectable({
  providedIn: 'root'
})
export class HytModalService {

  modalComponentRef: ComponentRef<HytModalContainerComponent>;

  modalSubscription;

  public modalRef: HytModalRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public open(componentType: Type<any>, data?: any): HytModalRef {
    this.modalComponentRef = this._appendModalComponentToBody(data);

    this.modalRef = new HytModalRef(componentType, this, data);

    this.modalComponentRef.instance.childComponent = this.modalRef;

    return this.modalRef;
  }

  public close() {
    this._removeModalComponentFromBody();
  }

  private _appendModalComponentToBody(data?: any) {

    // 1. Create a component reference from the component
    const componentRef = this.componentFactoryResolver
    .resolveComponentFactory(HytModalContainerComponent)
    .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    document.body.classList.add('hyt-modal-open');

    return componentRef;
  }

  private _removeModalComponentFromBody() {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
    document.body.classList.remove('hyt-modal-open');
  }

}
