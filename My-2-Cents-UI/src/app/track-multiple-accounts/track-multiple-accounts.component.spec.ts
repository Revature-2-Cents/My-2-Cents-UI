import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMultipleAccountsComponent } from './track-multiple-accounts.component';

describe('TrackMultipleAccountsComponent', () => {
  let component: TrackMultipleAccountsComponent;
  let fixture: ComponentFixture<TrackMultipleAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMultipleAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackMultipleAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
