import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
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
  public lang: any;
  private readonly $destroy = new Subject();

  constructor(private changeLanguageService: ChangeLanguageService,
              private eventListOpenService: EventListOpenService,
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
