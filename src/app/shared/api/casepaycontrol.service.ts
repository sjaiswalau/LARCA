import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/core/config.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable()
export default class CasePayControlService {
  public API: string;
  public CASEPAYCONTROL_API: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.CASEPAYCONTROL_API = `${this.API}/CasePayment`;
  }

  getCasePayControlByProviderAndCaseItem(code: string, type: string, caseItem: string) {
    return this.http.get<any>(`${this.CASEPAYCONTROL_API}/CasePayControl/${code}/${type}/${caseItem}`, httpOptions);
  }

  addCasePayControl(casePayControl: any) {
    return this.http.post(`${this.CASEPAYCONTROL_API}/AddPayControl`, casePayControl, httpOptions);
  }

  updateCasePayControl(casePayControl: any) {
    return this.http.post(`${this.CASEPAYCONTROL_API}/UpdatePayControl`, casePayControl, httpOptions);
  }

  deleteCasePayControl(casePayControl: any) {
    return this.http.post(`${this.CASEPAYCONTROL_API}/DeletePayControl`, casePayControl, httpOptions);
  }
}
