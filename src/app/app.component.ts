import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

//* locales
import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";

//* utiles
import { ConectorComponent, Mesa } from './conector/conector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConectorComponent, RouterOutlet, CabeceraComponent , MatButtonModule, BodyMainComponent, FooterComponent, BodyMainComponent , MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  conexion : ConectorComponent;
  dato: Mesa = {} as Mesa;

  constructor() {
    this.conexion = new ConectorComponent();
    this.conexion.conectar();


    this.conexion.client.subscribe(this.conexion.topico);
    this.conexion.client.on('message', (topic:string, message:Uint8Array) => {
      this.dato = JSON.parse(message.toString());
      console.log(this.dato.gameNumber);
    });

  
  }
}