import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { EventListOpenService } from 'src/app/core/shared/event-list-open.service';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-mobile-view-event-list',
  templateUrl: './mobile-view-event-list.component.html',
  styleUrls: ['./mobile-view-event-list.component.scss']
})
export class MobileViewEventListComponent implements OnInit {
  public eventListOpen: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private eventListOpenService: EventListOpenService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
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

  addEvent() {
    this.dialog.open(AddEventModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class'
    });
  }

  openEventFeed() {
    this.eventListOpen = !this.eventListOpen;
    this.eventListOpenService.isEventListOpen(true);
  }

}
