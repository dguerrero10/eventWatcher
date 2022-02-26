import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MobileViewService } from 'src/app/core/shared/mobile-view.service';

@Component({
  selector: 'app-google-maps-wrapper',
  templateUrl: './google-maps-wrapper.component.html',
  styleUrls: ['./google-maps-wrapper.component.scss']
})
export class GoogleMapsWrapperComponent implements OnInit, OnDestroy {
  public onMobile: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private mobileViewService: MobileViewService) { }

  ngOnInit(): void {
    this.mobileViewService.onMobileViewListener
      .pipe(
        takeUntil(this.$destroy)
      )
      .subscribe(mobileState => {
          if (mobileState) {
            this.onMobile = true;
          } else {
            this.onMobile = false;
          }
      });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
