import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RuletaServiceService } from '../../../services/ruleta-service.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { CreateTableComponent } from "./create-table/create-table.component";

@Component({
  selector: 'app-setup-table',
  standalone: true,
  imports: [AgGridAngular, CreateTableComponent],
  templateUrl: './setup-table.component.html',
  styleUrl: './setup-table.component.css',
})
export class SetupTableComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: Object[] = [];

  var = console.log('variables');
  tableName: string = '';

  constructor(private readonly httpService: RuletaServiceService) {
    console.log('constructor');
  }

  getTables(): Observable<any> {
    return this.httpService.getTables();
  }

  processDataTableMessage(message: any): void {
    this.columnDefs = [];
    const columnNames = Object.keys(message[0]);
    this.columnDefs = columnNames.map((name) => ({ field: name,minWidth: 100, maxWidth:120}));

    const newRowData = [];
    for (const element of message) {
      newRowData.push(element);
    }

    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', newRowData);
    } else {
      for (const element of message) {
        this.rowData.push(newRowData[element]);
      }
      this.rowData = newRowData;
    }
  }

  onGridReady(params: any): void {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTables().subscribe((posts) => {
      console.log(posts);
      this.tableName = posts[0].name;
      this.processDataTableMessage(posts);
    });
  }
}
