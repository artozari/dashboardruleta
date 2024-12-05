import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { Mesa } from '../conector/conector.component';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @Input() dato: Mesa = {} as Mesa;
  title: string;
  colDefs: ColDef[];
  rowData: Object[];
  gridApi!: GridApi;

  constructor() {
    this.title = 'Configuracion de Mesa';
    this.colDefs = [{ field: 'Data' }, { field: 'Values' }];
    this.rowData = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateGridData();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.updateGridData();
  }

  private updateGridData() {
    if (!this.dato.status) return;

    this.title = `Configuracion de Mesa: ${this.dato.tableData[3].toString()}`;

    const newRowData = [];
    for (let i = 0; i < this.dato.status.length - 1; i += 2) {
      newRowData.push({
        Data: this.dato.status[i].toString(),
        Values: this.dato.status[i + 1].toString(),
      });
    }

    this.colDefs = [
      { field: 'Data' },
      {
        field: 'Values',
        cellStyle: (params: any) => {
          if (params.value === this.dato.status[1]) {
            return { background: params.value };
          } else {
            return { background: this.dato.status[1] };
          }
        },
      },
    ];

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', newRowData);
    } else {
      this.rowData = newRowData;
    }
  }

  getRowStyle(params: any) {
    if (params.data.Values === 'someValue') {
      // Cambia 'someValue' por la condición que desees
      return { background: 'lightgreen' }; // Cambia el color según sea necesario
    }
    return null; // Estilo por defecto
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
