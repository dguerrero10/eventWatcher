import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { Marker } from 'src/app/core/shared/models/marker.model';

@Component({
  selector: 'app-display-marker-info-modal',
  templateUrl: './display-marker-info-modal.component.html',
  styleUrls: ['./display-marker-info-modal.component.scss']
})
export class DisplayMarkerInfoModalComponent implements OnInit, OnDestroy{
  public lang: any;
  private readonly $destroy = new Subject();

  constructor(private changeLanguageService: ChangeLanguageService,
              @Inject(MAT_DIALOG_DATA) public data: { marker: Marker }) { }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.$destroy.next(void 0);
    this.$destroy.complete();
  }

}
