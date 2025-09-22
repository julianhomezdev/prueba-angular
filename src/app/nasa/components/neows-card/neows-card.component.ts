import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-neows-card',
  templateUrl: './neows-card.component.html',
  styleUrls: ['./neows-card.component.css']
})
export class NeowsCardComponent {

  constructor(private nasaService: NasaService) { }

  get dates () {
    return this.nasaService.dates;
  }
}
