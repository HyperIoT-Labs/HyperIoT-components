import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HexagonComponent } from './hexagon.component';

describe('HexagonComponent', () => {
  let component: HexagonComponent;
  let fixture: ComponentFixture<HexagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HexagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
