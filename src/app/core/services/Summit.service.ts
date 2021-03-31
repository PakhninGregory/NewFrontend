import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SummitService{
  constructor(private http: HttpClient) { }

  // Summit

  getSummitsList(): Observable<any>{
    return this.http.get<any>(`${environment.APIUrl}/summits`);
  }

  addSummit(summit: any): Observable<any>{
    return this.http.post<any>(`${environment.APIUrl}/summits`, summit);
  }

  updateSummit(summit: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/summits/${summit.id}`, summit);
  }

  deleteSummit(summitId: any): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/summits/${summitId}`);
  }

  // Names

  getSummitNamesList(summitId: string): Observable<any[]>{
    return this.http.get<any>(`${environment.APIUrl}/summits/${summitId}/names`);
  }

  addSummitName(summitName: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/summits/${summitName.submitId}`, summitName);
  }

  updateSummitName(summitName: any): Observable<any>{
    return this.http.post<any>(`${environment.APIUrl}/summits/${summitName.summitId}/names/${summitName.id}`, summitName);
  }

  deleteSummitName(summitId: string, nameId: string): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/summits/${summitId}/names/${nameId}`);
  }

  // Alps

  getSummitAlpsList(summitId: string): Observable<any[]>{
    return this.http.get<any>(`${environment.APIUrl}/summits/${summitId}/alps`);
  }

  addSummitAlp(summitAlp: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/summits/${summitAlp.summitId}/alps/${summitAlp.id}`, summitAlp);
  }

  updateSummitAlp(summitAlp: any): Observable<any>{
    return this.http.post<any>(`${environment.APIUrl}/summits/${summitAlp.summitId}/alps/${summitAlp.id}`, summitAlp);
  }

  deleteSummitAlp(summitId: string, alpId: string): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/summits/${summitId}/alps/${alpId}`);
  }
}
