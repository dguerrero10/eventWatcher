import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EventListOpenService } from 'src/app/core/shared/event-list-open.service';
import { MobileViewService } from 'src/app/core/shared/mobile-view.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponenet implements OnInit, OnDestroy {
  public onMobile: boolean = false;
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
    this.eventListOpenService.isEventListOpen(false);
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
