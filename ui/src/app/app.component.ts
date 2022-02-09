import {Component, OnInit} from '@angular/core';
import {plainToClass, Type} from "class-transformer";
import 'reflect-metadata';

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
  public fetchingTime: string = 'loading';
  public parsingTimeWithoutClassTransformer: string = 'waiting';
  public parsingTimeWithClassTransformer: string = 'waiting';

  ngOnInit(): void {
    let start = new Date();
    fetch('https://api.instantwebtools.net/v1/passenger', {headers: {'mode': 'no-cors'}})
      .then((res: Response) => {
        start = new Date();
        this.parsingTimeWithoutClassTransformer = 'loading';
        res.json().then(() => this.parsingTimeWithoutClassTransformer = timeFrom(start));

        start = new Date();
        this.parsingTimeWithClassTransformer = 'loading';
        const passengers = plainToClass(Passenger, res.body)
        this.parsingTimeWithClassTransformer = timeFrom(start);
      })
      .catch((error) => console.error(error));
  }
}
