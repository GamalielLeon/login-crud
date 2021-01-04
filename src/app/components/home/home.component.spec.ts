import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { UserModel } from '../../models/user.model';
import { UsersAPIService } from 'src/app/services/users-api.service';

describe('Pruebas del HomeComponent', () => {
  const usersService: UsersAPIService = new UsersAPIService(null as any);
  let component: HomeComponent;
  const char: string = ' ';
  const users: UserModel[] = [{email: 'correo1@ejemplo.com', firstName: 'Nombre',
                              lastName: 'Apellido', roleId: '', birthDate: '20-05-1990'},
                              {email: 'correo2@ejemplo.com', firstName: 'nom bre',
                              lastName: 'ape llido', roleId: '', birthDate: '20-05-1990'},
                              {email: 'correo3@ejemplo.com', firstName: ' José',
                              lastName: 'Ortiz ', roleId: '', birthDate: '20-05-1990'},
                              {email: 'correo4@ejemplo.com', firstName: 'Juan1',
                              lastName: '1Perez', roleId: '', birthDate: '20-05-1990'}];

  for (const user of users) {
    it('Nombre recibido SI-CUMPLE con el formato a mostrar en pantalla', () => {
      spyOn(usersService, 'getUser').and.callFake( () => of(user) );
      component = new HomeComponent(usersService);
      expect(component.getUserName()).toBe(`${user.firstName} ${user.lastName}`);
    });
  }

  for (const user of users) {
    it('Nombre recibido NO-CUMPLE con el formato a mostrar en pantalla', () => {
      spyOn(usersService, 'getUser').and.callFake( () => of(user) );
      component = new HomeComponent(usersService);
      expect(component.getUserName()).not.toBe(`${user.firstName} ${char}${user.lastName}`);
    });
  }
});
