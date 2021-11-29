import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsDatepickerComponent } from './ts-datepicker.component';

describe('TsDatepickerComponent', () => {
  let component: TsDatepickerComponent;
  let fixture: ComponentFixture<TsDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
