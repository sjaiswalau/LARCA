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
export default class ProsthesisMappingService {
  public API: string;
  public PROSTHESISMAPPING_API: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.PROSTHESISMAPPING_API = `${this.API}/ProsthesisMapping`;
  }

  searchProsthesisMappingByItemCode(itemCode: string) {
    return this.http.get<any>(`${this.PROSTHESISMAPPING_API}/${itemCode}`, httpOptions);
  }

  updateProsthesisMapping(prosthesisMapping: any) {
    return this.http.post(`${this.PROSTHESISMAPPING_API}/Update`, prosthesisMapping.data, httpOptions);
  }
}
