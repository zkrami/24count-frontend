import {Injectable} from '@angular/core';
import {ApiHttpClient} from 'services/api-http-client.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RequirementItem} from 'models/requirement-item';

@Injectable({
  providedIn: 'root'
})
export class PharmacyRequirementsService {

  constructor(private http: ApiHttpClient) {
  }


  get(): Observable<RequirementItem[]> {

    return this.http.get('/pharmacy/requirements').pipe(map(res => {
      return res.data.map(it => new RequirementItem(it));
    }));
  }

  add(item_id)  : Observable<RequirementItem> {
    return this.http.post('/pharmacy/requirements', {item_id}).pipe(map(
      res => {
        return new RequirementItem(res.data)
      }
    ));
  }

  clear(): Observable<boolean> {
    return this.http.delete('/pharmacy/requirements/all').pipe(map(res => {
      return res.status == 200;
    }));
  }

  delete(id): Observable<boolean> {
    return this.http.delete(`/pharmacy/requirements/${id}`).pipe(map(res => {
      return res.status == 200;
    }));
  }
}
