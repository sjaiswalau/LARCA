import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/config.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
};


@Injectable()
export default class ProviderService {
  public API: string;
  public PROVIDERS_API: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.PROVIDERS_API = `${this.API}/provider`;
  }

  getByProviderCodeAndType(code: string, type: string) {
    return this.http.get(`${this.PROVIDERS_API}/${code}/${type}`, httpOptions);
  }
}
