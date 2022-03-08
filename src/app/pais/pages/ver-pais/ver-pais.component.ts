import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {


  pais!: Pais;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    //   .subscribe(({ id }) => { //desestructuracion del objeto        
    //     this.paisService.obtenerPaisPorCodigo(id)
    //       .subscribe(pais => {
    //         console.log(pais)
    //       });
    //   });

    //equivalente a la implementacion del operador rxjs/switchMap, el cual retorna un observable 

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.obtenerPaisPorCodigo(id)),
        tap(console.log)
      )
      .subscribe(pais => this.pais = pais[0]); //[0] refiere a la posicion del array que retorna el servicio 'obtenePaisPorCodigo(id), ya que la API retorna siempre arrays'

  }



}
