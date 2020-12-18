import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // References
  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = formBuilder.group({
      // Required, only admits alphanumerics and must have btw 6 to 12 characters.
      email: ['', [Validators.required, Validators.pattern('([a-zA-Z0-9._-]{2,})+([@]+[a-zA-Z0-9._-]{2,})+([\.]+[a-z]{2,5}$)')]],
      name: ['', [Validators.required, Validators.pattern('([a-zA-ZÑñáéíóúÁÉÍÓÚ ]){4,}')]],
      birthdate: ['']
    });
  }
  ngOnInit(): void { }

  /********** METHODS **********/
  checkSubmit(): void{
    if (this.userForm.valid) { this.router.navigateByUrl('/newPassword'); }
  }
  isFieldInvalid(fieldName: string): boolean{
    const field = this.userForm.controls[fieldName];
    return field.invalid && field.touched;
  }

  /********** GETTERS **********/

  /********** SETTERS **********/

}
