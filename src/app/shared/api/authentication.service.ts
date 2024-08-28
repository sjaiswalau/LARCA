import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/config.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export default class AuthenticationService {
  public API: string;
  public CASEPAYDEFINITION_API: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.CASEPAYDEFINITION_API = `${this.API}/CasePayment`;
  }

  authenticateUser() {
    return this.http.get(`${this.CASEPAYDEFINITION_API}/AuthenticateUser`, { withCredentials: true});
  }
}
