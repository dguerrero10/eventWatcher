import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { Auth } from 'src/app/core/shared/models/auth.model';

@Component({
  selector: 'app-mobile-view-event-list',
  templateUrl: './mobile-view-event-list.component.html',
  styleUrls: ['./mobile-view-event-list.component.scss']
})
export class MobileViewEventListComponent implements OnInit {
  public eventListOpen: boolean = false;
  public isLoggedIn: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
              private eventListOpenService: EventListOpenService) { }

  ngOnInit(): void {
    this.shareAuthStatusService.authenticatedListener
      .pipe(
        takeUntil(this.$destroy)
      )
        .subscribe((value: Auth) => this.isLoggedIn = value.isLoggedIn);
    this.eventListOpenService.eventListOpenListener
      .pipe(
        takeUntil(this.$destroy)
        )
        .subscribe(isOpen => {
            if (isOpen) {
              this.eventListOpen = true;
            } else {
              this.eventListOpen = false;
            }
        });
  }

  onPanStart(event: any) {
    this.eventListOpen = !this.eventListOpen;
    this.eventListOpenService.isEventListOpen(true);
  }

  openEventFeed() {
    this.eventListOpen = !this.eventListOpen;
    this.eventListOpenService.isEventListOpen(true);
  }

}
