import { Component, OnInit, OnDestroy } from '@angular/core';
import { CityService } from '../../services/cities.service';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit, OnDestroy {
    private citiesList: Array<string> = [];
    private unsubscribeAll: Subject<any> = new Subject();
    public filteredOptions: Array<string>;
    public cityFormControl: FormControl = new FormControl();
    public initialCities: Array<City> = [];

    constructor(private citiesService: CityService,
                private weatherService: WeatherService) {
    }

    private getWeather(): void {
        this.weatherService.getInitialWeather()
            .pipe(
                takeUntil(this.unsubscribeAll)
            )
            .subscribe((citiesWeather: Array<City>) => {
                this.initialCities = citiesWeather;
            });
    }

    private filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.citiesList.filter(option => option.toLowerCase().indexOf(filterValue) !== -1);
    }

    public selectCity(event: any): void {
        this.weatherService.getWeather(event.option.value)
            .pipe(
                takeUntil(this.unsubscribeAll)
            )
            .subscribe((data: any) => {
                this.initialCities.unshift(data);
            });
    }

    ngOnInit() {
        this.getWeather();
        this.citiesService.getCities()
            .pipe(
                takeUntil(this.unsubscribeAll),
                switchMap((value: Array<string>) => {
                    this.citiesList = value;
                    this.filteredOptions = value;
                    return this.cityFormControl.valueChanges;
                }),
                map((value: string) => {
                    return this.filter(value);
                })
            )
            .subscribe((value: Array<string>) => {
                this.filteredOptions = value;
            });
    }

    ngOnDestroy() {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
