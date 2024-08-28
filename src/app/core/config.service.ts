import { Injectable } from '@angular/core';

import { environment as Environment } from 'src/environments/environment';
import { AppSettings } from 'src/environments/model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Injectable()
export class ConfigService {
  //public environment: AppSettings = Environment;
  public configLoaded = new Subject<AppSettings>();
  public config: AppSettings;

  constructor(private httpService: HttpClient) {
  }

  public loadConfig(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.httpService
        .get<AppSettings>(`${window.location.origin}/assets/config.json`)
        .pipe(
          catchError(response => {
            reject(response);
            return EMPTY;
          })
        )
        .subscribe(
          response => {
            try {
              this.config = response;
              this.configLoaded.next(response);
              resolve();
            } catch (e) {
              reject(e);
            }
          }
        );
    });
  }

}
