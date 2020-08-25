import { Component, OnInit, Input } from '@angular/core';
import { Gasto } from '../gasto';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'detalle-gasto',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  // Estamos colocando la la instacia de gasto en detalles component
  @Input() gasto: Gasto;
  titulo: string = 'Detalle del gasto';

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  cerrarModal() {
    this.modalService.cerrarModal();
  }
}
