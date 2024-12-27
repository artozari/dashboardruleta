import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TableServiceApi } from '../../../services/ruleta-service.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { CreateTableComponent } from './create-table/create-table.component';
import { GetTableComponent } from '../get-table/get-table.component';

@Component({
  selector: 'app-setup-table',
  standalone: true,
  imports: [AgGridAngular, CreateTableComponent, GetTableComponent],
  templateUrl: './setup-table.component.html',
  styleUrl: './setup-table.component.css',
})
export class SetupTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: Object[] = [];
  tableName: string = '';
  result: any = {};

  constructor(private readonly httpService: TableServiceApi) {}

  getTables(): Observable<any> {
    return this.httpService.getTables();
  }

  processDataTableMessage(message: any): void {
    this.columnDefs = [];
    let columnNames;
    if (typeof message.length === 'undefined') {
      console.log('tiene 1');
      console.log(message.name);
      columnNames = Object.keys(message);
      console.log(columnNames);
    } else {
      columnNames = Object.keys(message[0]);
    }
    this.columnDefs = columnNames.map((name) => ({
      field: name,
      minWidth: 100,
      maxWidth: 120,
    }));

    const newRowData = [];
    if (typeof message.length === 'undefined') {
      newRowData.push(message);
    } else {
      for (const element of message) {
        newRowData.push(element);
      }
    }

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', newRowData);
    } else {
      if (typeof message.length === 'undefined') {
        this.rowData.push(newRowData);
      } else {
        for (const element of message) {
          this.rowData.push(newRowData[element]);
        }
      }
      this.rowData = newRowData;
    }
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.realizarBusqueda();
  }

  realizarBusqueda(): void {
    this.getTables().subscribe((posts) => {
      this.tableName = posts[0].name;
      this.processDataTableMessage(posts);
    });
  }

  onProcessDataChange(data: any): void {
    this.result = data; // Actualizar el resultado
    this.processDataTableMessage(data); // Procesar los datos para la tabla
  }
}
