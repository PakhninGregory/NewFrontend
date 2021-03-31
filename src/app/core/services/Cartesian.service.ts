import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartesianService{
  constructor(private http: HttpClient) { }

  getPointList(): Observable<any>{
    return this.http.get<any>(`${environment.APIUrl}/cartesian`);
  }

  addPoint(summit: any): Observable<any>{
    return this.http.post<any>(`${environment.APIUrl}/cartesian`, summit);
  }

  updatePoint(summit: any): Observable<any>{
    return this.http.put<any>(`${environment.APIUrl}/cartesian/${summit.id}`, summit);
  }

  deletePoint(summitId: any): Observable<any>{
    return this.http.delete<any>(`${environment.APIUrl}/cartesian/${summitId}`);
  }
}
