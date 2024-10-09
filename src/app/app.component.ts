import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BodyMainComponent } from "./body-main/body-main.component";
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from "./cabecera/cabecera.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Mqttservice } from './services/mqttservice.service';
import { Mesa } from './conector/conector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, CabeceraComponent , MatButtonModule, BodyMainComponent,  FooterComponent, BodyMainComponent , MatMenuModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit{

  formSelectTable = new FormGroup({
    mesaInput: new FormControl(''),
  });
  
  mostrarMesa = false;
  inpMesa = document.getElementById("mesaInput");
  mesa: Mesa = {} as Mesa;
  constructor(private _myMqtt: Mqttservice) {  }



  cambiarMostrarMesa(){
    this.mostrarMesa = !this.mostrarMesa;
  }
}
//# todo generate automatic updates of the data graph