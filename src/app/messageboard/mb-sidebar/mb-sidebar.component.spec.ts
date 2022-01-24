import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbSidebarComponent } from './mb-sidebar.component';

describe('MbSidebarComponent', () => {
  let component: MbSidebarComponent;
  let fixture: ComponentFixture<MbSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
