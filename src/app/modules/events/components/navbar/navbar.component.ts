import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { MobileViewService } from 'src/app/core/services/mobile-view.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { Auth } from 'src/app/core/shared/models/auth.model';
import { AuthenticateModalComponent } from '../authenticate-modal/authenticate-modal.component';
import { FirstTimeAuthenticateModalComponent } from '../first-time-authenticate-modal/first-time-authenticate-modal.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public hideNav: boolean = false;
  public onMobile: boolean = false;
  public navMenuOpen: boolean = false;
  public isLoggedIn: boolean = false;
  public lang: any;
  public putinClownImg: string = '../../../../../assets/images/gay-putin-clown.jpg';
  private readonly $destroy = new Subject();
  
  constructor(private afAuth: AngularFireAuth,
              private shareAuthStatusService: ShareAuthStatusService,
              private changeLanguageService: ChangeLanguageService,
              private mobileViewService: MobileViewService,
              private eventListOpenService: EventListOpenService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.shareAuthStatusService.authenticatedListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((value: Auth) => {
         this.isLoggedIn = value.isLoggedIn;
         this.navMenuOpen = false;
        });
    this.mobileViewService.onMobileViewListener
      .pipe(
        takeUntil(this.$destroy)
      ).subscribe(mobileState => {
        if (mobileState) {
          this.onMobile = true;
        } else {
          this.onMobile = false;
        }
      })
    this.eventListOpenService.eventListOpenListener
      .pipe(
        takeUntil(this.$destroy)
        )
        .subscribe(isOpen => {
            if (isOpen) {
              this.hideNav = true;
            } else {
              this.hideNav = false;
            }
        });
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

  toggleNavMenu() {
    this.navMenuOpen = !this.navMenuOpen;
  }

  firstTimeAuthenticate() {
    this.dialog.open(FirstTimeAuthenticateModalComponent, {
      width: '300px',
      panelClass: 'modal-class'
    });
  }

  authenticate() {
    this.dialog.open(AuthenticateModalComponent, {
      width: '300px',
      panelClass: 'modal-class'
    });
  }

  deauthenticate() {
    this.afAuth.signOut().then(() => {
      this.shareAuthStatusService.isLoggedIn({ isLoggedIn: false, uid: null });
    });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
