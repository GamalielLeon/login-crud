import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersAPIService } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = 'Nombre completo del usuario';

  constructor() {
    const token: any = localStorage.getItem('token');
    const userData = Object.values( JSON.parse(atob(token.split('.')[1])) );
    this.name = `${userData[1]} ${userData[2]}`;
  }
  ngOnInit(): void { }

}
