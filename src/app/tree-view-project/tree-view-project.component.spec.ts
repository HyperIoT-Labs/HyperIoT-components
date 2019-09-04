import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewProjectComponent } from './tree-view-project.component';

describe('TreeViewProjectComponent', () => {
  let component: TreeViewProjectComponent;
  let fixture: ComponentFixture<TreeViewProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
