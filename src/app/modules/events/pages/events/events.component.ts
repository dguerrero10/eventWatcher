import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MobileViewService } from 'src/app/core/shared/mobile-view.service';
import { AddEventModalComponent } from '../../components/add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  public onMobile: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private breakpointObserver: BreakpointObserver,
              private mobileViewService: MobileViewService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.breakpointObserver
    .observe(['(max-width: 500px)'])
    .pipe(
      takeUntil(this.$destroy)
    )
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.onMobile = true;
        this.mobileViewService.switchToMobileState(true);
      } else {
        this.onMobile = false;
        this.mobileViewService.switchToMobileState(false);
      }
    });
  }

  addEvent() {
    this.dialog.open(AddEventModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class'
    });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
