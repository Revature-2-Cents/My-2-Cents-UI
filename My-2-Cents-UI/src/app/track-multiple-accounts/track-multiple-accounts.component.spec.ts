import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
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
        AuthModule.forRoot({
          domain: 'environment.auth.domain',
          clientId: 'environment.auth.clientId'
        }),
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
