import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(public http: HttpClient) {
    }

    getWeather(city: City): Observable<any> {
        return this.http.get(`${environment.baseUrl}/api/weather/${city}`);
    }

    getInitialWeather(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/api/weather/all`);
    }

}
