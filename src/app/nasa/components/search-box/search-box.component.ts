import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  selectedDate: string;

  constructor(private nasaService: NasaService) {
    this.selectedDate = '';
  }

  printDate() {
    this.nasaService.buscarNeo(this.selectedDate);
  }

}
