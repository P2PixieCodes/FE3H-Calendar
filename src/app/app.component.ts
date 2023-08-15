import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataModel, DayModel, MonthModel } from './data-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    public jsonData: any;

    public selectedMonth: MonthModel | null = null;
    public selectedDay: DayModel | null = null;

    public initialized: boolean = false;

    constructor(private httpClient: HttpClient, private cdref: ChangeDetectorRef) {}

    ngOnInit(): void {
        const headers: HttpHeaders = new HttpHeaders({"Accept": "application/vnd.github+json"});
        firstValueFrom(this.httpClient.get<DataModel>("/assets/calendar-data.json",{headers})).then((result) => {
            this.jsonData = result;
            const selectMonth = result.parts[0].months[0];
            const selectDay = selectMonth.days[20];
            if (!!selectDay && !!selectMonth) {
                this.selectToggle(selectMonth,selectDay);
            }
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {this.initialized = true}, 700);
    }

    public getBgImageUrl(month: MonthModel): string {
        return month.weeks.toString();
    }

    public selectToggle(month: MonthModel, day: DayModel, event?: Event): void {
        if (!!event) {
            event.stopPropagation();
        }
        if (this.selectedMonth == month && this.selectedDay == day) {
            this.selectedMonth = null;
            this.selectedDay = null;
        } else {
            this.selectedMonth = month;
            this.selectedDay = day;
        }
    }
}
