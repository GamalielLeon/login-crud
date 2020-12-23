import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // References
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService) {
    this.loginForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+([@]+[a-zA-Z0-9._-]{2,})+([\.]+[a-z]{2,5}$)')]],
      password: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9]){8,10}')]]
    });
  }
  ngOnInit(): void {
    document.body.style.backgroundImage = 'url("assets/images/bgImg0.jpg")';
    this.tokenService.getToken({Username: 'string', Password: 'string'}).subscribe(
      (tokenData: any) => localStorage.setItem('token', tokenData.accessToken));
  }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.loginForm.valid) { this.router.navigateByUrl('register'); }
    this.loginForm.markAllAsTouched();
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.loginForm.controls[fieldName];
    return field.invalid && field.touched;
  }

  /********** GETTERS **********/

  /********** SETTERS **********/

}
