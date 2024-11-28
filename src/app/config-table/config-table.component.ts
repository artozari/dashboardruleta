import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
  styleUrl: './config-table.component.css'
})
export class ConfigTableComponent implements OnChanges {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  @Input() dato: Mesa = {} as Mesa;
  title: string;
  colDefs: ColDef[];
  rowData: Object[];
  private gridApi!: GridApi;

  constructor() {
    console.log("============= Constructor =============╗");
    this.title = "Configuracion de Mesa";
    this.colDefs = [
      { field: "Data" },
      {
        field: "Values",
        cellStyle: { background: "green" }
      },
    ];
    this.rowData = [];
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("============= onChanges ===============╗");
    this.updateGridData();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.updateGridData();
  }

  private updateGridData() {
    if (!this.dato.configData) return;

    this.title = `Configuracion de Mesa: ${this.dato.configData[3].toString()}`;

    const newRowData = [];
    for (let i = 0; i < this.dato.configData.length - 1; i += 2) {
      newRowData.push({
        Data: this.dato.configData[i].toString(),
        Values: this.dato.configData[i + 1].toString(),
      });
    }

    this.colDefs = [
      { field: "Data" },
      {
        field: "Values",
        cellStyle: { background: this.dato.configData[33] }
      },];

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', newRowData);
    } else {
      this.rowData = newRowData;
    }
  }

  ngOnInit() {
    console.log("============= ngOnInit ================╗");
  }

  ngAfterViewInit() {
    console.log("============= ngAfterViewInit =========╗");
  }
}

// import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
// import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
// import { Mesa } from '../conector/conector.component';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';

// @Component({
//   selector: 'app-config-table',
//   standalone: true,
//   imports: [AgGridAngular],
//   templateUrl: './config-table.component.html',
//   styleUrl: './config-table.component.css'
// })
// export class ConfigTableComponent implements OnChanges {

//   var = console.log("============= Variables ===============╗");

//   @Input() dato: Mesa = {} as Mesa;
//   title: string;
//   colDefs: ColDef[];
//   rowData: Object[];

//   constructor() {
//     console.log("============= Constructor =============╗");
//     this.title = "Configuracion de Mesa";
//     this.colDefs = [];
//     this.rowData = [];
//   }

//   ngOnChanges(changes: SimpleChanges) {
//     console.log("============= onChanges ===============╗");

//     this.title = `Configuracion de Mesa: ${this.dato.configData[33].toString()}`;

//     this.colDefs.push({ field: "Data" });
//     this.colDefs.push({ field: "Values" });

//     let i = 0;

//     while (i < this.dato.configData.length - 1) {
//       console.log(this.dato.configData[i + 1]);
//       this.rowData.push({ Data: this.dato.configData[i].toString(), Values: this.dato.configData[i + 1].toString() });
//       i += 2;
//     }

//   }


//   ngOnInit() {
//     console.log("============= ngOnInit ================╗");
//   }

//   ngAfterViewInit() {
//     console.log("============= ngAfterViewInit =========╗");
//   }

// }
