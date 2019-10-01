import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsTemplateComponent } from './inputs-template.component';

describe('InputsComponent', () => {
  let component: InputsTemplateComponent;
  let fixture: ComponentFixture<InputsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputsTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
