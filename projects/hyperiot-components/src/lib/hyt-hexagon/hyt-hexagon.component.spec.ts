import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytHexagonComponent } from './hyt-hexagon.component';

describe('HytHexagonComponent', () => {
  let component: HytHexagonComponent;
  let fixture: ComponentFixture<HytHexagonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytHexagonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytHexagonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
