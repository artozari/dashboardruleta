
import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { Mesa } from '../conector/conector.component';

@Component({
  selector: 'app-casino-data',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: `casino-data.component.html`,
})

export class CasinoDataComponent implements OnChanges {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @Input() dato: Mesa = {} as Mesa;

  title = "";
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: Object[] = [];
  client: any;

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = this.dato.tableData[3].toString();
    this.processDataTableMessage(this.dato.casinoData);
  }

  processDataTableMessage(message: any): void {

    this.columnDefs = message.filter((_: any, index: number) => index % 2 === 0).map((field: any) => ({ field: field.toString() }));

    const fila: any = {};
    for (let i = 0; i < message.length; i += 2) {
      fila[message[i].toString()] = message[i + 1].toString();
    }
    this.rowData.push(fila);
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
    params.api.setRowData(this.rowData);
  }
}