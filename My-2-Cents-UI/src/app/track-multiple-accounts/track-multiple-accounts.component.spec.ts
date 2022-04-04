import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TrackMultipleAccountsComponent', () => {
  let component: TrackMultipleAccountsComponent;
  let fixture: ComponentFixture<TrackMultipleAccountsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMultipleAccountsComponent ],
      imports: [
        HttpClientTestingModule
      ]
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
