import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person );
  }

  //Para manejar los errores:
  /* isValidField( field:string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  } */

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  //ngSubmit
  onSave() {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }

}
