import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollingTableComponent } from './infinite-scrolling-table.component';

describe('InfiniteScrollingTableComponent', () => {
  let component: InfiniteScrollingTableComponent;
  let fixture: ComponentFixture<InfiniteScrollingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
