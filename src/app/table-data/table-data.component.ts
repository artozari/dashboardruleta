
import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { Mesa } from '../conector/conector.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: `table-data.component.html`,
})

export class DataTableComponent implements OnChanges {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @Input() dato: Mesa = {} as Mesa;

  title = "";
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: Object[] = [];
  client: any;

  constructor() {

    this.columnDefs =
      [
        { field: "Data" },
        { field: "Values" }
      ];

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = this.dato.tableData[3].toString();

    this.processDataTableMessage(this.dato.tableData);
  }


  processDataTableMessage(message: any): void {

    let newRowData = [];
    for (let i = 0; i < message.length - 1; i += 2) {
      newRowData.push({
        Data: message[i].toString(),
        Values: message[i + 1].toString(),
      });
    }

    this.columnDefs =
      [
        { field: "Data" },
        { field: "Values" }
      ];

    // Actualiza la tabla de AgGrid
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', newRowData);
    } else {
      this.rowData = newRowData;
    }
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
    params.api.setRowData(this.rowData);
  }
}