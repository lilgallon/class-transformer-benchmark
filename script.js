"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
window.addEventListener('load', function () {
    var startTimeWithoutClassTransformer = new Date();
    fetch('https://api.instantwebtools.net/v1/passenger')
        .then(function (res) {
        document.querySelector('#fetchingTimeWithoutClassTransformer').innerHTML = timeFrom(startTimeWithoutClassTransformer);
        res.json()
            .then(function () {
            document.querySelector('#parsingTimeWithoutClassTransformer').innerHTML = timeFrom(startTimeWithoutClassTransformer);
        });
    });
    var startTimeWithClassTransformer = new Date();
    fetch('https://api.instantwebtools.net/v1/passenger')
        .then(function (res) {
        document.querySelector('#fetchingTimeWithClassTransformer').innerHTML = timeFrom(startTimeWithClassTransformer);
        var passengers = (0, class_transformer_1.plainToClass)(Passenger, res.body);
        res.json()
            .then(function () {
            document.querySelector('#parsingTimeWithClassTransformer').innerHTML = timeFrom(startTimeWithClassTransformer);
        });
    });
});
function timeFrom(date) {
    return (new Date().getTime() - date.getTime()) / 1000 + " s";
}
var Passenger = /** @class */ (function () {
    function Passenger() {
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return PassengerData; }),
        __metadata("design:type", Array)
    ], Passenger.prototype, "data", void 0);
    return Passenger;
}());
var PassengerData = /** @class */ (function () {
    function PassengerData() {
    }
    __decorate([
        (0, class_transformer_1.Type)(function () { return Airline; }),
        __metadata("design:type", Array)
    ], PassengerData.prototype, "airline", void 0);
    return PassengerData;
}());
var Airline = /** @class */ (function () {
    function Airline() {
    }
    return Airline;
}());
//# sourceMappingURL=script.js.map