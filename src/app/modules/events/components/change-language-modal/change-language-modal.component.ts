import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { Language } from 'src/app/core/shared/models/languages.model';

@Component({
  selector: 'app-change-language-modal',
  templateUrl: './change-language-modal.component.html',
  styleUrls: ['./change-language-modal.component.scss']
})
export class ChangeLanguageModalComponent implements OnInit, OnDestroy {
  public lang: any;
  public initialValue: any;
  public languages: Language[] = [
    { viewValue: 'English', value: 'eng', selected: false },
    { viewValue: 'Ukranian', value: 'ukr', selected: false },
    { viewValue: 'Russian', value: 'ru', selected: false },
  ];
  private readonly $destroy = new Subject();
  
  constructor(private dialogRef: MatDialogRef<ChangeLanguageModalComponent>,
              private changeLanguageService: ChangeLanguageService) { }

  ngOnInit(): void {
    this.changeLanguageService.selectedLangListener
    .pipe(
      takeUntil(this.$destroy))
      .subscribe((key: string) => {
        if (key === 'ukr') this.lang = this.lang = LANGUAGE_DICT['ukr'];
        else if (key === 'ru') this.lang = this.lang = LANGUAGE_DICT['ru'];
        else if (key === 'eng') this.lang = this.lang = LANGUAGE_DICT['eng'];
        else this.lang = this.lang = LANGUAGE_DICT['eng'];
        this.initialValue = this.languages.find(val => val.value === key)?.value;
    });
  }

  onLanguageChange(event: any) {
    this.changeLanguageService.changeLanguage(event.value);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.$destroy.next(void 0);
    this.$destroy.complete();
  }

}
