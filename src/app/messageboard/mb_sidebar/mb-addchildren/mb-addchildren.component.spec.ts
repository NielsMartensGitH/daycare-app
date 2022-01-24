import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbAddchildrenComponent } from './mb-addchildren.component';

describe('MbAddchildrenComponent', () => {
  let component: MbAddchildrenComponent;
  let fixture: ComponentFixture<MbAddchildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbAddchildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbAddchildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
