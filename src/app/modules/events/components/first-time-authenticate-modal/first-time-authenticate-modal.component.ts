import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';

@Component({
  selector: 'app-first-time-authenticate-modal',
  templateUrl: './first-time-authenticate-modal.component.html',
  styleUrls: ['./first-time-authenticate-modal.component.scss']
})
export class FirstTimeAuthenticateModalComponent implements OnInit {
  public isSubmitting: boolean = false;
  public firstTimeAuthForm: FormGroup = <FormGroup>{};
  public loginError: boolean = false;

  constructor(private dialogRef: MatDialogRef<FirstTimeAuthenticateModalComponent>,
              private shareAuthStatusService: ShareAuthStatusService,
              private fb: FormBuilder,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.firstTimeAuthForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(10)]]
    });
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'email':
        if (this.firstTimeAuthForm.controls['email'].hasError('required')) {
          return 'Email is required.'
        }
        if (this.firstTimeAuthForm.controls['email'].hasError('email')) {
          return 'Email is invalid.'
        }
        else return;
      case 'password':
        if (this.firstTimeAuthForm.controls['password'].hasError('required')) {
          return 'Password is required.'
        }
        if (this.firstTimeAuthForm.controls['password'].hasError('minlength')) {
          return 'Password must be at least 10 characters.'
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.firstTimeAuthForm.invalid) return;
    this.isSubmitting = true;
    const { email, password } = formData.value;
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.dialogRef.close();
        this.shareAuthStatusService.isLoggedIn({ isLoggedIn: true, uid: res.user.uid });
      })
      .catch(()=> {
        this.isSubmitting = false;
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 3000)
      });
   }
}
