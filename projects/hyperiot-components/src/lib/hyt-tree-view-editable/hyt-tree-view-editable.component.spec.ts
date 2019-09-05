import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytTreeViewEditableComponent } from './hyt-tree-view-editable.component';

describe('HytTreeViewEditableComponent', () => {
  let component: HytTreeViewEditableComponent;
  let fixture: ComponentFixture<HytTreeViewEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytTreeViewEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytTreeViewEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
