import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingspageComponent } from './payingspage.component';

describe('PayingspageComponent', () => {
  let component: PayingspageComponent;
  let fixture: ComponentFixture<PayingspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayingspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayingspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
