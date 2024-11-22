import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { ConectorComponent, Mesa } from './conector/conector.component';
import { MesaComponent } from './mesa/mesa.component';
// import { SalaComponent } from './sala/sala.component';
// import { CommonModule } from '@angular/common';
import { SalamapComponent } from './salamap/salamap.component';
import { WinningGamesGraphComponent } from './winning-games-graph/winning-games-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CabeceraComponent,
    FooterComponent,
    // ReactiveFormsModule,
    MesaComponent,
    // SalaComponent,
    // CommonModule,
    SalamapComponent,
    WinningGamesGraphComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

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
      this.mesas[this.dato.tableData[1]] = {
        ts: this.dato.ts,
        gameNumber: this.dato.gameNumber,
        casinoData: this.dato.casinoData,
        tableData: this.dato.tableData,
        configData: this.dato.configData,
        winningNumbersData: this.dato.winningNumbersData,
      };
      this.cantTablesRecived = Object.keys(this.mesas);
      console.log(this.dato.tableData[3], "en app");
    });
    
  }

  cambiarMostrarMesa(k: string): void {
    this.tableSelected = k;
    this.mostrarSala = !this.mostrarSala;
  }
}
