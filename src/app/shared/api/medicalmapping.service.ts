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
export default class MedicalMappingService {
  public API: string;
  public MEDICALMAPPING_API: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    this.MEDICALMAPPING_API = `${this.API}/MedicalMapping`;
  }

  searchMedicalMappingByDescription(description: string) {
    return this.http.get<any>(`${this.MEDICALMAPPING_API}/${description}`, httpOptions);
  }

  getAllMedicalMappings() {
    return this.http.get<any>(`${this.MEDICALMAPPING_API}/Medical`, httpOptions);
  }

  updateMedicalMapping(medicalMapping: any) {
    return this.http.post(`${this.MEDICALMAPPING_API}/Update`, medicalMapping.data, httpOptions);
  }
}
