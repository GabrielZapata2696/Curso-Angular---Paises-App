import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input-filtro',
  templateUrl: './input-filtro.component.html',
  styleUrls: ['./input-filtro.component.css']
})
export class InputFiltroComponent implements OnInit {

  filtro: string = '';

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Output() onDelete: EventEmitter<[string, boolean]> = new EventEmitter();

  @Input() placeholder: string = '';


  debouncer: Subject<string> = new Subject();

  debouncerTime: number = 450;

  constructor() { }

  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(this.debouncerTime)
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor)
      });
  }

  buscar() {
    this.onEnter.emit(this.filtro);
  }

  escribiendo(event: any) {

    if (event.inputType === 'deleteContentBackward') {
      setTimeout(() => {
        this.onDelete.emit([event.target.value, true]);
      }, this.debouncerTime);

    }
    this.debouncer.next(this.filtro)
  }

}
