import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Neo } from '../interfaces/nasa.interfaces';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private _dates: any[] = [];
  private _apodObj: any

  // Cargar variables de entorno
  private readonly apiApodUrl = environment.nasaApodEndpoint;
  private readonly apiKey = environment.apiKey;
  private readonly apiNeowsUrl = environment.nasaNeowsEndpoint


  constructor(private http: HttpClient) { }

  get dates() {
    return [...this._dates];
  }

  get apod() {
    return this._apodObj;
  }

  getApod() {
    /**
     * Paso 1
     * Almacene en una variable un número aleatorio entre 1 y 7
     */


    const numeroAleatorio: number = Math.floor(Math.random() * 7) + 1;



    /**
     * Paso 2
     * Fecha aleatoria entre últimos 7 días
     * Obtenga y almacene en una variable la fecha actual
     * A los días de la fecha actual le debe restar el número obtenido en el Paso 1 para obtener una fecha aleatoria de los últimos 7 días
     */


    // Obtener fecha actual
    const fechaActual = new Date();

    // Obtener dia para operar, luego restar el numero aleatorio
    fechaActual.setDate(fechaActual.getDate() - numeroAleatorio);

    // Formatear fecha para compatibilidad
    const fechaFormateada = fechaActual.toISOString().split('T')[0];





    /**
     * Paso 3
     * petición APOD endpoint
     * consulte el endpoint https://api.nasa.gov/planetary/apod enviando los parámetros:
     * date = fecha obtenida en el Paso 2 en formato YYYY-MM-DD
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * Debe asignar el valor de la respuesta del endpoint a la variable global _apod que ya se encuentra declarada, ejemplo: this._apodObj = respuesta;
     */

    const params = new HttpParams()
      .set('date', fechaFormateada)
      .set('api_key', this.apiKey);

    //console.log(`${this.apiApodUrl}`, { params })
    
    
  
    return this.http.get(`${this.apiApodUrl}`, { params })
    
    // Manejar errores
    .pipe(
      
      catchError(error => {
        
        console.error('Error en getApod:', error);
        return of(null);
        
      })
    )
    
    .subscribe(response => {
      
      this._apodObj = response;
      
    });


  }

  /**
   * 
   * @param date Fecha seleccionada en el input date
   */
  buscarNeo(date: string) {
    /**
     * Paso 1
     * petición NEOWS endpoint
     * consulte el endpoint https://api.nasa.gov/neo/rest/v1/feed enviando los parámetros:
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * start_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * end_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * Nota: para start_date y end_date se utiliza el mismo valor el cual llega como parámetro de la función.
     * Debe asignar el valor de la respuesta del endpoint a la variable global _dates, ejemplo: this._dates = respuesta.near_earth_objects[date], siendo [date] el parámetro que recibe la función;
     */


    // Constuir parametros
    const params = new HttpParams()
      .set('start_date', date)
      .set('end_date', date)
      .set('api_key', this.apiKey);


    const url = `${this.apiNeowsUrl}`;

    return this.http.get<any>(url, { params })
    
      .pipe(
        
        catchError(error => {
          
          console.error('Error en buscarNeo -> ', error);
          return of(null);
          
        })
        
        
      )
        .subscribe(response => {
          
          if(response && response.near_earth_objects) {
            
            this._dates = response.near_earth_objects[date];
            
          }

        

      });

  }
  
}
