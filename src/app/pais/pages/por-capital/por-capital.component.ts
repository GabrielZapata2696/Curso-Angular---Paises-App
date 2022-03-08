import { Component, OnInit } from '@angular/core';
import { Pais } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  filtro: string = '';
  existeError: boolean = false;
  paises: Pais[] = [];


  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }


  buscar(filtro: string) {
    this.filtro = filtro;
    this.existeError = false;
    this.paisService.obtenerPaisXCapital(this.filtro).subscribe((paisesAPI) => {
      this.paises = paisesAPI;
    }, (err) => {
      this.paises = [];
      this.existeError = true;
    });
  }

  sugerencias(filtroSugerencia: string) {

    console.log(filtroSugerencia);
  }

}
