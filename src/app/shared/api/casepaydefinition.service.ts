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
export default class CasePayDefinitionService {
  public API: string;
  public CASEPAYDEFINITION_API: string;

  private isUpdated: boolean;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.CASEPAYDEFINITION_API = `${this.API}/CasePayment`;
  }


  update(casePayDefinition: any, code: string, type: string) : any{
      this.updateCasePayDefinition(casePayDefinition, code, type);
      return this.isUpdated;
  }

  authenticateUser() {
    return this.http.get(`${this.CASEPAYDEFINITION_API}/AuthenticateUser`, { withCredentials: true});
  }

  getCasePayDefinitionByProviderCodeAndType(code: string, type: string) {
    return this.http.get(`${this.CASEPAYDEFINITION_API}/${code}/${type}`, httpOptions);
  }

  updateCasePayDefinition(casePayDefinition: any, code: string, type: string) {

    // tslint:disable-next-line: max-line-length
    return this.http.post<any>(`${this.CASEPAYDEFINITION_API}/CasePayDefinition/${type}/${code}`, casePayDefinition.data, httpOptions);

  }
}
