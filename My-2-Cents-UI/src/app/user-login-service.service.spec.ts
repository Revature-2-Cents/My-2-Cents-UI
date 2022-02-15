import { TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';
import { UserLoginServiceService } from './user-login-service.service';

describe('UserLoginServiceService', () => {
  let service: UserLoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      AuthModule.forRoot({
        domain: 'environment.auth.domain',
        clientId: 'environment.auth.clientId'
      })]
    });
    service = TestBed.inject(UserLoginServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
