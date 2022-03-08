import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';

@Component({
  selector: 'app-authenticate-modal',
  templateUrl: './authenticate-modal.component.html',
  styleUrls: ['./authenticate-modal.component.scss']
})
export class AuthenticateModalComponent implements OnInit, OnDestroy {
  public loginError: boolean = false;
  public isSubmitting: boolean = false;
  public lang: any;
  public authForm: FormGroup = <FormGroup>{};
  private readonly $destroy = new Subject();

  constructor(private dialogRef: MatDialogRef<AuthenticateModalComponent>,
              private shareAuthStatusService: ShareAuthStatusService,
              private changeLanguageService: ChangeLanguageService,
              private fb: FormBuilder,
              private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.createForm();
    this.changeLanguageService.selectedLangListener
    .pipe(
      takeUntil(this.$destroy))
      .subscribe((key: string) => {
        if (key === 'ukr') this.lang = this.lang = LANGUAGE_DICT['ukr'];
        else if (key === 'ru') this.lang = this.lang = LANGUAGE_DICT['ru'];
        else if (key === 'eng') this.lang = this.lang = LANGUAGE_DICT['eng'];
        else this.lang = this.lang = LANGUAGE_DICT['eng'];
    });
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
          return this.lang.formErrors.emailIsRequired;
        }
        if (this.authForm.controls['email'].hasError('email')) {
          return this.lang.formErrors.emailIsInvalid;
        }
        else return;
      case 'password':
        if (this.authForm.controls['password'].hasError('required')) {
          return this.lang.formErrors.passwordIsRequired;
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
      }).catch(()=> {
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
