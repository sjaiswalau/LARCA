import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'src/app/core/config.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  withCredentials: true
};

@Injectable({ providedIn: 'root' })
export default class MedicalMappingService {
  public API: string;
  public MEDICALMAPPING_API: string;
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.API = this.configService.config.apiServer;
    // this.MEDICALMAPPING_API = `${this.API}/MedicalMapping`;
    this.MEDICALMAPPING_API = `http://localhost:3000/Response`;
  }

  searchMedicalMappingByDescription(description: string) {
    return this.http.get<any>(`${this.MEDICALMAPPING_API}/${description}`, httpOptions);
  }

  getAllMedicalMappings() {
    // return this.http.get<any>(`${this.MEDICALMAPPING_API}/Medical`, httpOptions);
    return this.http.get<any>(`${this.MEDICALMAPPING_API}`);
  }
  getById(id: number) {
    return this.http.get<any>(`${this.MEDICALMAPPING_API}/${id}`);
  }

  updateMedicalMapping(id: number, medicalMapping: any) {
    return this.http.put(`${this.MEDICALMAPPING_API}/${id}`, medicalMapping);
  }

  create(medicalMapping: any) {
    return this.http.post(`${this.MEDICALMAPPING_API}/`, medicalMapping);
  }
  delete(id: number) {
    return this.http.delete(`${this.MEDICALMAPPING_API}/${id}`)
  }
}
