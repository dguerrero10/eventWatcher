import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';

@Component({
  selector: 'app-first-time-authenticate-modal',
  templateUrl: './first-time-authenticate-modal.component.html',
  styleUrls: ['./first-time-authenticate-modal.component.scss']
})
export class FirstTimeAuthenticateModalComponent implements OnInit, OnDestroy {
  public loginError: boolean = false;
  public isSubmitting: boolean = false;
  public firstTimeAuthForm: FormGroup = <FormGroup>{};
  public lang: any;
  private readonly $destroy = new Subject();

  constructor(private dialogRef: MatDialogRef<FirstTimeAuthenticateModalComponent>,
              private shareAuthStatusService: ShareAuthStatusService,
              private changeLanguageService: ChangeLanguageService,
              private fb: FormBuilder,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.createForm();
    this.changeLanguageService.selectedLangListener
    .pipe(
      takeUntil(this.$destroy)
    )
     .subscribe((key: string) => {
      if (key === 'ukr') this.lang = this.lang = LANGUAGE_DICT['ukr'];
      else if (key === 'ru') this.lang = this.lang = LANGUAGE_DICT['ru'];
      else if (key === 'eng') this.lang = this.lang = LANGUAGE_DICT['eng'];
      else this.lang = this.lang = LANGUAGE_DICT['eng'];
    });
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
          return this.lang.formErrors.emailIsRequired;
        }
        if (this.firstTimeAuthForm.controls['email'].hasError('email')) {
          return this.lang.formErrors.emailIsInvalid;
        }
        else return;
      case 'password':
        if (this.firstTimeAuthForm.controls['password'].hasError('required')) {
          return this.lang.formErrors.passwordIsRequired;
        }
        if (this.firstTimeAuthForm.controls['password'].hasError('minlength')) {
          return this.lang.formErrors.passwordMinLength;
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

   ngOnDestroy(): void {
    this.$destroy.next(void 0);
    this.$destroy.complete();
  }
}
