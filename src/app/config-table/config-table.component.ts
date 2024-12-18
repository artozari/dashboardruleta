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
  selector: 'app-config-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './config-table.component.html',
  styleUrl: './config-table.component.css',
})
export class ConfigTableComponent implements OnChanges {
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
    if (!this.dato.configData) return;

    this.title = `Configuracion de Mesa: ${this.dato.tableData[3].toString()}`;

    const newRowData = [];
    for (let i = 0; i < this.dato.configData.length - 1; i += 2) {
      newRowData.push({
        Data: this.dato.configData[i],
        Values: this.dato.configData[i + 1],
      });
    }

    this.colDefs = [
      { field: 'Data' },
      {
        field: 'Values',
        cellStyle: (params: any) => {
          if (params.data.Data === 'colorOfLights') {
            return { background: params.value };
          } else {
            return null;
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
