import { AbstractControl } from '@angular/forms';
import { getLimitsBirthDate } from '../constants/functions';

export function birthDateValidator(formControl: AbstractControl): {[key: string]: boolean}|null {
  const limitsBirthDate: string[] = getLimitsBirthDate();
  const b: boolean = formControl.value < limitsBirthDate[0] || formControl.value > limitsBirthDate[1];
  const message = {birthDateValid: false};
  return b ? message : null;
}
