import { ApplicationConfig, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appConfig: ApplicationConfig = {
  providers: [
   provideRouter([
    { path: '',component: LoginComponent}
   ])
  ]
};
