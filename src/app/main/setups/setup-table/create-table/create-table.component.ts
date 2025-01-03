import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableServiceApi } from '../../../../services/ruleta-service.service';
import { uid } from 'uid';

interface Table {
  key: string;
  name: string;
  shortName: string;
  posX: number;
  posY: number;
  layout: number;
  noSmoking: boolean;
  tableNumber: number;
}

@Component({
  selector: 'app-create-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-table.component.html',
  styleUrl: './create-table.component.css',
})

export class CreateTableComponent {
  tableName: string = '';
  tableShortName: string = '';
  tableNumber: number = 0;
  tableLayout: number = 0;
  tableNoSmoking: boolean = false;
  tablePosX: number = 0;
  tablePosY: number = 0;

  constructor(private readonly ruletaService: TableServiceApi) {}

  insertTable(table: Table) {
    this.ruletaService.postTable(table).subscribe((data) => {
      if (data.status === 400) {
        console.log("ok");
      }
    });
  }

  onSubmit() {
    let table = {
      key: uid(20),
      name: this.tableName,
      shortName: this.tableShortName,
      posX: this.tablePosX,
      posY: this.tablePosY,
      layout: this.tableLayout,
      noSmoking: this.tableNoSmoking,
      tableNumber: this.tableNumber,
    };
    this.insertTable(table);
  }
}
