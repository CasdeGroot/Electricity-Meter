import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GascardComponent } from './gascard.component';

describe('GascardComponent', () => {
  let component: GascardComponent;
  let fixture: ComponentFixture<GascardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GascardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GascardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
