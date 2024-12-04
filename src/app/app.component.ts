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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  planoSelect = 1;
  conexion: ConectorComponent;
  mesas: Record<string, Mesa> = {};
  dato: Mesa = {} as Mesa;
  cantTablesRecived: string[] = [];
  mostrarSala = true;
  time: string = new Date().toLocaleTimeString();
  min: number = 0;
  tableSelected: string = '1';
  semaforo: string[] = [];

  constructor() {
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
    console.log(plano);

    this.planoSelect = plano;
  }
}
