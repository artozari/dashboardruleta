import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ConectorComponent, Mesa } from './conector/conector.component';
import { MesaComponent } from './mesa/mesa.component';
import { SalamapComponent } from './salamap/salamap.component';
import { WinningGamesGraphComponent } from './winning-games-graph/winning-games-graph.component';
import { ConfigTableComponent } from './config-table/config-table.component';
import { DataTableComponent } from './table-data/table-data.component';
import { CasinoDataComponent } from './casino-data/casino-data.component';
import { FormsModule } from '@angular/Forms';
import { StatusComponent } from './status/status.component';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    MesaComponent,
    SalamapComponent,
    WinningGamesGraphComponent,
    ConfigTableComponent,
    DataTableComponent,
    CasinoDataComponent,
    FormsModule,
    StatusComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  planoSelect: number;
  conexion: ConectorComponent;
  mesas: Record<string, Mesa> = {};
  dato: Mesa = {} as Mesa;
  cantTablesRecived: string[] = [];
  mostrarSala = true;
  time: string = new Date().toLocaleTimeString();
  min: number = 0;
  tableSelected: string = '0';
  cantplanos: string[] = ['-2', '-1', '0', '1', '2', '3', '4'];
  semaforo: string[] = [];
  mostrarPlanos: boolean = false;

  constructor() {
    this.planoSelect = 1;
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.min = new Date().getMinutes();
    }, 1000);

    this.conexion = new ConectorComponent();
    this.conexion.conectar();
    this.conexion.client.subscribe(this.conexion.topico);

    this.conexion.client.on('message', (topic: string, message: Uint8Array) => {
      this.dato = JSON.parse(message.toString());
      this.mesas[this.dato.tableData[1].toString()] = {
        ts: this.dato.ts,
        gameNumber: this.dato.gameNumber,
        casinoData: this.dato.casinoData,
        tableData: this.dato.tableData,
        configData: this.dato.configData,
        winningNumbersData: this.dato.winningNumbersData,
        status: this.dato.status,
      };
      this.cantTablesRecived = Object.keys(this.mesas);
    });
  }

  cambiarMostrarMesa(k: string): void {
    this.tableSelected = k;
    this.mostrarSala = !this.mostrarSala;
  }

  cambiarPlano(plano: number) {
    this.planoSelect = plano;
  }

  rotarPlanos() {
    this.mostrarPlanos = !this.mostrarPlanos;
    const intervalId = setInterval(() => {
      if (this.mostrarPlanos) {
        this.planoSelect = parseInt(this.planoSelect.toString()) + 1;
        if (this.planoSelect > 4) {
          this.planoSelect = 0;
        }
      } else {
        clearInterval(intervalId);
      }
    }, 4000);
  }
}
