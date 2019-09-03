import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytInputTemplateComponent } from './hyt-input-template.component';

describe('HytInputTemplateComponent', () => {
  let component: HytInputTemplateComponent;
  let fixture: ComponentFixture<HytInputTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytInputTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytInputTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
