import { LoginFormComponent } from './login-form.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UsersAPIService } from '../../services/users-api.service';
import { RolesApiService } from 'src/app/services/roles-api.service';
import { CheckAttemptsService } from 'src/app/services/check-attempts.service';

describe('Pruebas del LoginFormComponent', () => {
  let component: LoginFormComponent;
  let serviceRouter: Router;
  let tokenService: TokenService;
  let rolesService: RolesApiService;
  let usersService: UsersAPIService;
  const checkAttemptsService: CheckAttemptsService = new CheckAttemptsService();
  const emailsBlocked: string[] = ['correo2@ejemplo.com', 'correo4@ejemplo.com', 'correo01@ejemplo.com'];
  const rightEmails: string[] = ['correo@ejemplo.com', 'co@ej.co', 'correo1.nombre@ejemplo.com',
                                 'mi_correo@ejemplo.com', 'mi_correo2.nombre@ejemplo.com'];
  const wrongEmails: string[] = ['', 'correo', 'correo@ejemplo', 'correo@ejemplo.c', 'correo@.com',
                            'c@e.c', '@ejemplo.com', 'correo@', ' correo@eje.com', '1corr@ejem.com',
                            'co rreo@ejemplo.com', 'cor@ejem@plo.com', '  correo@ejem1.com',
                            'corr|eo@ejemplo.com', 'corr@ejem+ploo.com'];

  beforeEach( () => component = new LoginFormComponent(new FormBuilder(), serviceRouter, tokenService,
    checkAttemptsService, rolesService, usersService) );

  for (const email of rightEmails) {
    it('Formato de correo electrónico VÁLIDO para el correo ' + email, () => {
      const control = component.loginForm.controls.email;
      control.setValue(email);
      expect(control.valid).toBeTruthy();
    });
  }

  for (const email of wrongEmails) {
    it('Formato de correo electrónico NO-VÁLIDO para el correo ' + email, () => {
      const control = component.loginForm.controls.email;
      control.setValue(email);
      expect(control.valid).toBeFalsy();
    });
  }

  it('Verifica si un correo electrónico ESTÁ bloqueado', () => {
    const controls = component.loginForm.controls;
    controls.email.setValue('correo01@ejemplo.com');
    controls.password.setValue('Password00');
    spyOn(checkAttemptsService, 'isUserEmailBlocked').and.callFake( (userEmail) => {
      return emailsBlocked.includes(userEmail);
    });
    component.checkIsUserEmailBlocked();
    expect(controls.password.value).toBe('');
  });
});
