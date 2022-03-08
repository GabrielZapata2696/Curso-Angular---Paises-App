import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {


  regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  regionActiva: string = '';
  paises: Pais[] = [];
  paisesPrevFiltro: Pais[] = [];


  filtro: string = '';
  existeError: boolean = false;


  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }


  getBotonActivoCss(region: string) {
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }


  activarRegion(region: string) {

    if (region === this.regionActiva) { return; }

    this.regionActiva = region;
    this.paises = [];
    this.paisesPrevFiltro = [];
    this.paisService.obtenerPaisesXRegion(region).subscribe((paises: Pais[]) => {
      this.paises = paises;
      this.paisesPrevFiltro = this.paises;
    });


  }


  buscar(filtro: [any, boolean]) {

    if (filtro[1]) {
      this.paises = this.paisesPrevFiltro;
    }
    this.filtro = filtro[0];
    this.paises = this.paises.filter(x => x.name.common.toLowerCase().indexOf(filtro[0].toLowerCase()) > -1);





  }

  reinicio(condicion: string) {

  }

  sugerencias(filtroSugerencia: string) {

    //console.log(filtroSugerencia);
  }


}
