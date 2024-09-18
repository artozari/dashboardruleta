import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { FooterComponent } from './footer/footer.component';
import { BodyMainComponent } from "./body-main/body-main.component";

import mqtt from "mqtt"; // import namespace "mqtt"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, BodyMainComponent, FooterComponent, BodyMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  dato = "";

  constructor() {
    let topico = "AngelSMC";

    this.client.on("connect", () => {
      this.client.subscribe(`${topico}`, (err) => {
        if (!err) {
          this.client.publish(`${topico}`, `Me conecte y subs a ${topico}`);
        } else {
          console.log("no se pudo conectar");
        }
        console.log("aqui toy");
      });
    });

    this.client.on("message", (topic, message) => {
      console.log(message.toString());
      this.dato = message.toString();
      // client.end();
    });
  };

}