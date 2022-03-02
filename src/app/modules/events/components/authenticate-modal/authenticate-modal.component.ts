import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';

@Component({
  selector: 'app-authenticate-modal',
  templateUrl: './authenticate-modal.component.html',
  styleUrls: ['./authenticate-modal.component.scss']
})
export class AuthenticateModalComponent implements OnInit {
  public isSubmitting: boolean = false;
  public authForm: FormGroup = <FormGroup>{};
  public loginError: boolean = false;

  constructor(private dialogRef: MatDialogRef<AuthenticateModalComponent>,
              private shareAuthStatusService: ShareAuthStatusService,
              private fb: FormBuilder,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]]
    });
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'email':
        if (this.authForm.controls['email'].hasError('required')) {
          return 'Email is required.'
        }
        if (this.authForm.controls['email'].hasError('email')) {
          return 'Email is invalid.'
        }
        else return;
      case 'password':
        if (this.authForm.controls['password'].hasError('required')) {
          return 'Password is required.'
        }
        else return;
      default:
        return;
    }
  }

  onSubmit(formData: FormGroup) {
    if (this.authForm.invalid) return;
    this.isSubmitting = true;
    const { email, password } = formData.value;
    this.afAuth.signInWithEmailAndPassword(email, password)
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
