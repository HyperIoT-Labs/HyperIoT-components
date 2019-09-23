import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytAutocompleteComponent } from './hyt-autocomplete.component';

describe('HytAutocompleteComponent', () => {
  let component: HytAutocompleteComponent;
  let fixture: ComponentFixture<HytAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
