import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDescComponent } from './single-desc.component';

describe('SingleDescComponent', () => {
  let component: SingleDescComponent;
  let fixture: ComponentFixture<SingleDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
