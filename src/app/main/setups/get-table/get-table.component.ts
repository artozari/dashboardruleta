import { Component, EventEmitter, input, Output } from '@angular/core';
import { TableServiceApi } from '../../../services/ruleta-service.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './get-table.component.html',
  styleUrl: './get-table.component.css',
})
export class GetTableComponent {
  search: string = '';
  procesData = input();
  @Output() procesDataChange = new EventEmitter<any>();

  constructor(private readonly ruletaService: TableServiceApi) {}

  getTable(id: string): Observable<any> {
    return this.ruletaService.getTable(id);
  }

  onSubmit() {
    console.log(this.search);
      this.getTable(this.search).subscribe((data) => {
        this.procesData = data
        this.procesDataChange.emit(this.procesData);
      })
  }
}
