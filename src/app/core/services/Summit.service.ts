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

  addSummitName(summitId: any, summitName: any): Observable<any>{
    return this.http.post<any>(`${environment.APIUrl}/summits/${summitId}/names`, summitName);
  }

  updateSummitName(summitId: any, objId: any, summitName: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/summits/${summitId}/names/${objId}`, summitName);
  }

  deleteSummitName(summitId: string, nameId: string): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/summits/${summitId}/names/${nameId}`);
  }

  // Alps

  getSummitAlpsList(summitId: string): Observable<any[]>{
    return this.http.get<any>(`${environment.APIUrl}/summits/${summitId}/alps`);
  }

  addSummitAlp(summitId: any, summitAlp: any): Observable<any>{
    console.log(summitAlp);
    return this.http.post<any>(`${environment.APIUrl}/summits/${summitId}/alps`, summitAlp);
  }

  updateSummitAlp(summitId: any, summitAlp: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/summits/${summitId}/alps/${summitAlp.id}`, summitAlp);
  }

  deleteSummitAlp(summitId: string, alpId: string): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/summits/${summitId}/alps/${alpId}`);
  }
}
