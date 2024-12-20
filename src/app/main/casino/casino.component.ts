import { Component, OnInit, ViewChild } from '@angular/core';
import { CasinoApiService } from '../../services/casino-api.service';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, ColDef } from 'ag-grid-community';

export interface Casino {
  id: number;
  createdAt: string;
  updatedAt: string;
  casinoCode: string;
  name: string;
  country: string;
  province: string;
  city: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  mqtt_url: string;
  mqtt_port: string;
  mqtt_protocol: string;
  mqtt_tls: boolean;
  mqtt_user: string;
  mqtt_password: string;
  mqtt_refresh_time_msec: number;
}

@Component({
  selector: 'app-casino',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.css',
})
export class CasinoComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  gridApi!: GridApi;
  columnDefs: ColDef[] = [];
  rowData: Object[] = [];

  casinos: Casino[] = [];
  constructor(private readonly casinoApiService: CasinoApiService) {}
  ngOnInit(): void {
    this.casinoApiService.getAllCasinos().subscribe((games) => {
      this.casinos = games;
      this.processDataTableMessage(this.casinos);
    });
  }

  processDataTableMessage(message: any): void {
    this.columnDefs = [];
    const columnNames = Object.keys(message[0]);
    this.columnDefs = columnNames.map((name) => ({
      field: name,
      minWidth: 100,
    }));

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
}
