import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytTreeViewProjectComponent } from './hyt-tree-view-project.component';

describe('HytTreeViewProjectComponent', () => {
  let component: HytTreeViewProjectComponent;
  let fixture: ComponentFixture<HytTreeViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytTreeViewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytTreeViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
