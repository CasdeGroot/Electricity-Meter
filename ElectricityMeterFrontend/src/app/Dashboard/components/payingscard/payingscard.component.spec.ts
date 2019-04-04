import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayingscardComponent } from './payingscard.component';

describe('PayingscardComponent', () => {
  let component: PayingscardComponent;
  let fixture: ComponentFixture<PayingscardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayingscardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayingscardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
