import {Component, OnInit} from '@angular/core';
import {plainToInstance, Type} from "class-transformer";
import 'reflect-metadata';
import {HttpClient} from "@angular/common/http";

function timeFrom(date: Date): string {
  return (new Date().getTime() - date.getTime()) / 1000 + " s"
}

class Passenger {
  totalPassengers!: string;
  totalPages!: string;
  @Type(() => PassengerData) data!: PassengerData[];
}

class PassengerData {
  _id!: string;
  name!: string;
  trips!: number;
  @Type(() => Airline) airline!: Airline[]
}

class Airline {
  id!: string;
  name!: string;
  country!: string;
  logo!: string;
  slogan!: string;
  head_quaters!: string;
  website!: string;
  established!: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public passengers: Passenger[] = [];
  public parsingTimeWithoutClassTransformer: string = 'waiting';
  public parsingTimeWithClassTransformer: string = 'waiting';
  public size: string = '?';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {

    this.httpClient
      .get<{ data: Passenger[] }>('https://api.instantwebtools.net/v1/passenger', {headers: { 'Access-Control-Allow-Origin': '*' }})
      .subscribe((passengersResult) => {
        const passengers = passengersResult.data;

        const evenMorePassengers = [
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers,
          ...passengers
        ]

        let start1 = new Date();
        this.passengers = plainToInstance(Passenger, evenMorePassengers);
        this.parsingTimeWithClassTransformer = timeFrom(start1);

        let start2 = new Date();
        this.passengers = evenMorePassengers;
        this.parsingTimeWithoutClassTransformer = timeFrom(start2);

        this.size = (this.sizeof(evenMorePassengers) / 1000000) + ' MB';
      });
  }

  // bytes
  private sizeof(o: any): number {
    return JSON.stringify(o).replace(/[\[\]\,\"]/g,'').length
  }
}
