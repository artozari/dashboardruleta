import { Component, effect, input } from '@angular/core';
import { Canvas, FabricObject, loadSVGFromURL, Rect, util } from 'fabric';

@Component({
  selector: 'app-sala-map',
  standalone: true,
  imports: [],
  templateUrl: './sala-map.component.html',
  styleUrl: './sala-map.component.css',
})
export class SalaMapComponent {
  idMesa = input();
  winningNumber = input();
  status = input();
  planoSelect = input<number>(0);

  mesaSelect = input();
  canvas2: any;
  buildZone: any;
  wrapper: any;
  styleZone: any;
  plano: string="";
  pl = new FabricObject();

  constructor() {
      this.plano = this.obtenerPlano(this.planoSelect().toString());
      effect(() => {
        if(this.planoSelect().toString() !== this.plano){
          this.canvas2.clear();
          this.plano = this.obtenerPlano(this.planoSelect().toString());
          loadSVGFromURL(this.plano).then((resultSVG) => {
            this.pl = util.groupSVGElements(
              resultSVG.objects as FabricObject[],
              resultSVG.options
            );
            this.pl.set({
              left: 0,
              top: 0,
              scaleX: 3,
              scaleY: 3,
              originX: 0,
              originY: 0,
              hoverCursor: 'pointer',
              selectable: false,
            });
            this.canvas2.setWidth(this.pl.getScaledWidth());
            this.canvas2.setHeight(this.pl.getScaledHeight());
            this.canvas2.add(this.pl);
          });
        }
      });
  }

  ngOnInit() {
    console.log('ngAfterViewInit');
    this.buildZone = document.getElementById('buildZone');
    this.wrapper = document.getElementById('wrapper');
    this.styleZone = document.getElementById('styleZone');
    this.canvas2 = new Canvas('canvas2', {
      width: 700,
      height: 400,
      backgroundColor: '#ffffff',
    });
    console.log(this.plano);

    loadSVGFromURL(this.plano).then((resultSVG) => {
      this.pl = util.groupSVGElements(
        resultSVG.objects as FabricObject[],
        resultSVG.options
      );
      this.pl.set({
        left: 0,
        top: 0,
        scaleX: 3,
        scaleY: 3,
        originX: 0,
        originY: 0,
        hoverCursor: 'pointer',
        selectable: false,
      });
      this.canvas2.setWidth(this.pl.getScaledWidth());
      this.canvas2.setHeight(this.pl.getScaledHeight());
      this.canvas2.add(this.pl);
    });
  }

  obtenerPlano(name: string): string {
    if (name !== '-1') {
      return `plano-${name}.svg`;
    } else {
      this.canvas2.setWidth(400);
      this.canvas2.setHeight(400);
      return `plano.svg`;
    }
  }
}
