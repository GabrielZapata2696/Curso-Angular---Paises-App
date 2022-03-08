import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  filtro: string = '';
  existeError: boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  sugerencia: string = '';
  mostrarSugerencias: boolean = false;

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  buscar(filtro: string) {
    this.filtro = filtro;
    this.existeError = false;
    this.paisService.obtenerPais(this.filtro).subscribe((paisesAPI) => {
      this.paises = paisesAPI;
    }, (err) => {
      this.paises = [];
      this.existeError = true;
    });
  }

  sugerencias(filtroSugerencia: string) {
    this.existeError = false;
    this.mostrarSugerencias = true;
    this.paisService.obtenerPais(filtroSugerencia).subscribe((paises: Pais[]) => {
      this.paisesSugeridos = paises.splice(0, 5);
    }, (err) => {
      this.paisesSugeridos = [];
    });

    this.sugerencia = filtroSugerencia;


  }

  buscarSugerido(sugerido: string) {
    this.buscar(sugerido);
    this.mostrarSugerencias = false;
  }

}
