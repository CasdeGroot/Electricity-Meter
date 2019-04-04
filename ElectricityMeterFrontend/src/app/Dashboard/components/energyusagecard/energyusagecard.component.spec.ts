import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyusagecardComponent } from './energyusagecard.component';

describe('EnergyusagecardComponent', () => {
  let component: EnergyusagecardComponent;
  let fixture: ComponentFixture<EnergyusagecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyusagecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyusagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
