import { Injectable } from '@angular/core';
import { translations } from '../../assets/translation/mvp-match-movie-translations';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  getTranslation(key: string): string {
    return _.get(translations, key);
	}
}
