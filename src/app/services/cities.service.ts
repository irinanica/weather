import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(public http: HttpClient) {
    }

    getCities(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/api/cities`);
    }

}
