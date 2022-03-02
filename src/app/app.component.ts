import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, Subject, takeUntil, tap } from 'rxjs';
import { GetIPAddressService } from './core/services/get-ip-address.service';
import { ShareAuthStatusService } from './core/services/share-auth-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
    private afAuth: AngularFireAuth,
    private getIPAddressService: GetIPAddressService) { }

  ngOnInit(): void {
    this.afAuth.authState.pipe(first())
      .pipe(
        takeUntil(this.$destroy),
        tap((user: any) => {
          if (user) {
            return this.shareAuthStatusService.isLoggedIn({ isLoggedIn: true, uid: user.uid });
          } else {
            return this.shareAuthStatusService.isLoggedIn({ isLoggedIn: false, uid: null });
          }
        })).subscribe();

    this.getIPAddressService.getIPAddress()
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe((ip: any) => {
        this.getIPAddressService.shareIPAddress(ip);
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next(void 0);
    this.$destroy.complete();
  }

}
