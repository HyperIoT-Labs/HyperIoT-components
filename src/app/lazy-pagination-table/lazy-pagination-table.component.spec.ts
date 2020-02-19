import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyPaginationTableComponent } from './lazy-pagination-table.component';

describe('LazyPaginationTableComponent', () => {
  let component: LazyPaginationTableComponent;
  let fixture: ComponentFixture<LazyPaginationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyPaginationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
