import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})


export class BusquedaComponent {

  //El simbolo de "!" es para confirmar que es algo que sabemos que vamos a usar 100% siempre
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; 

  //Con esto inyectamos el servicio, lo importamos y ya tenemos acceso a todas sus propiedades y metodos
  constructor( private gifsService: GifsService ){}


 buscar(){
  const valor = this.txtBuscar.nativeElement.value;

  if (valor.trim().length===0){
    return;
  }

  this.gifsService.buscarGifs( valor );

  this.txtBuscar.nativeElement.value = '';
 }

}
