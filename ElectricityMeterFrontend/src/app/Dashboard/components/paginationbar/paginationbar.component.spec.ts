import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationbarComponent } from './paginationbar.component';

describe('PaginationbarComponent', () => {
  let component: PaginationbarComponent;
  let fixture: ComponentFixture<PaginationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
