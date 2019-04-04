import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLineChartComponent } from './linechart.component';

describe('CustomLineChartComponent', () => {
  let component: CustomLineChartComponent;
  let fixture: ComponentFixture<CustomLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
