import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent {

  constructor(private nasaService: NasaService) {

  }

  ngOnInit() {
    this.nasaService.getApod();
  }

  get apod () {
    return this.nasaService.apod;
  }

}
