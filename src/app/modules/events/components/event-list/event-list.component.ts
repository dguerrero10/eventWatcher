import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { MobileViewService } from 'src/app/core/services/mobile-view.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponenet implements OnInit, OnDestroy {
  public onMobile: boolean = false;
  public slideInDownAnimation: string = '';
  private readonly $destroy = new Subject();

  constructor(private eventListOpenService: EventListOpenService,
              private mobileViewService: MobileViewService) { }

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

  closeEventList() {
    this.slideInDownAnimation = 'slide-down-out';
    setTimeout(() => {
      this.eventListOpenService.isEventListOpen(false);
    }, 180);
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
