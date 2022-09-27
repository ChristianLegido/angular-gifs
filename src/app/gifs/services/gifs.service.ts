import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})


export class GifsService {

  private apiKey: string = 'VMYzX9uhuFneJtLVVG3ChTwKdDMFCSRR';
  private _historial: string[] = [];

  //Cambiar any por su tipo correspondiente: GIF
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];//Usamos el operador Spread, para romper la referencia

  }

  //Solo se ejecuta la primera vez que es llamado, como un singleton
  //Trabajaremos através de observables
  constructor( private http: HttpClient ) {
      this._historial = JSON.parse (localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse (localStorage.getItem('resultados')!) || [];
  }

  //Definir nuevo metodo para agregar personajes
  añadirHistorial(historial: string) {
    this._historial.push(historial);
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLocaleLowerCase();

    //¿Como hacemos para asegurarnos de que solo vamos a tener unicos, no duplicados?
    //Usamos el include para saber si lo incluye o no y con la !, decimos:
    //Si no lo incluye añadelo
    if (!this._historial.includes(query)) {
      //Si no lo incluye en el array entonces añadelo
      this._historial.unshift(query);

    //Esto nos ayuda a no pasar de 10 elementos en el sidebar
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial))
    
    
  }

    const params = new HttpParams()
                  .set('api_Key', this.apiKey)
                  .set('limit', '10')
                  .set('q', query)

    console.log(params.toString());

    /*Como hacer peticiones HTTP
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=VMYzX9uhuFneJtLVVG3ChTwKdDMFCSRR&q=naruto');
    const data = await resp.json();
    console.log(data);
    */

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
    //El .subscribe para recibir la resolucion del get, es como el .then;


  }

}
