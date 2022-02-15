import { TestBed, waitForAsync } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule, AuthService, User } from '@auth0/auth0-angular';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TrackIncomeComponent } from './track-income/track-income.component';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';
import { LoginComponent } from './login/login.component';

describe('AppComponent', () => {
    const routes: Routes = [
        { path: '', redirectTo: '/login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent},
        { path: 'dashboard', component: TrackMultipleAccountsComponent}
    ];
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                TrackIncomeComponent,
                LoginComponent,
                TrackMultipleAccountsComponent,
                UserProfileComponent,
            ],
            imports: [
                RouterModule.forRoot(routes),
                AuthModule.forRoot({
                    domain: 'environment.auth.domain',
                    clientId: 'environment.auth.clientId'
                }),
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
            ]
        }).compileComponents();
    }));

    it(`should have as title 'My-2-Cents-UI'`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('My-2-Cents-UI');
    }));
    it(`should render 'My2Cents' in header tag`, waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('header').textContent).toContain('My2Cents');
    }));
});