import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeLanguageService {
  private selectedLang = new BehaviorSubject<string>('eng');
  public selectedLangListener = this.selectedLang.asObservable();

  constructor() { }

  changeLanguage(value: string) {
    this.selectedLang.next(value);
  }

}
