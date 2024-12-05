import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Mesa } from '../conector/conector.component';
import {
  Canvas,
  Path,
  FabricText,
  FabricObject,
  loadSVGFromURL,
  util,
} from 'fabric';
@Component({
  selector: 'app-salamap',
  standalone: true,
  imports: [],
  templateUrl: './salamap.component.html',
  styleUrls: ['./salamap.component.css'],
})
export class SalamapComponent implements OnChanges {
  @Input() datoSimple: Mesa;
  @Input() planoSelect: number;
  canvas: any;
  fabric = new FabricObject();
  objetos: FabricObject[];
  ubicacion: number[];
  mesa = new FabricObject();
  idMesa = new FabricObject();
  numero = new FabricObject();
  plano = new FabricObject();

  primerIteracion: boolean;
  buildZone: any;
  wrapper: any;
  paddingShift: any;
  styleZone: any;
  colors: string[];
  defaultColor: string;
  activeElement: HTMLElement | null;
  isSelectedClass: string;
  strokeWidth: number;
  strokeColor: string;
  pathString = 'M 0 0 Q 50 -50 100 0 L 100 50 Q 50 150 0 50 Z';

  constructor() {
    this.objetos = [];
    this.planoSelect = 0;
    this.primerIteracion = false;
    this.canvas = new Canvas();

    this.datoSimple = {} as Mesa;
    this.colors = [
      'red',
      'yellow',
      'green',
      '#43c8bf',
      '#896bc8',
      '#e54f6b',
      '#a5346b',
      '#234f6b',
      '#ffffff',
    ];
    this.defaultColor = this.colors[3];
    this.activeElement = null;
    this.isSelectedClass = 'isSelected';
    this.ubicacion = [0, 0, 0, 0, 0] as const;
    this.strokeWidth = 2;
    this.strokeColor = this.defaultColor;
  }
  //# onChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datoSimple']?.firstChange === false) {
      if (
        this.datoSimple.tableData[15].toString() === this.planoSelect.toString()
      ) {
        this.objetos = this.canvas
          ?.getObjects()
          .filter(
            (Obj: { get: (arg0: string) => string | number }) =>
              Obj.get('id') === this.datoSimple.tableData[1]
          );

        this.objetos.forEach((element) => {
          if (element.get('id') === this.datoSimple.tableData[1]) {
            this.canvas.remove(element);
          }
        });

        this.mesa = new Path(this.pathString, {
          //#
          strokeWidth: this.strokeWidth,
          stroke: this.strokeColor,
          angle: 0,
          left: parseInt(this.datoSimple.tableData[11].toString()),
          top: parseInt(this.datoSimple.tableData[13].toString()),
          fill: this.datoSimple.status[1],
          selectable: false,
          id: this.datoSimple.tableData[1],
        });

        this.numero = new FabricText(
          //#
          this.datoSimple.winningNumbersData[0][3].toString(),
          {
            strokeWidth: this.strokeWidth,
            backgroundColor: 'transparent',
            stroke: 'white',
            fill: 'white',
            left: parseInt(this.datoSimple.tableData[11].toString()) + 40,
            top: parseInt(this.datoSimple.tableData[13].toString()) + 30,
            id: this.datoSimple.tableData[1],
            selectable: false,
          }
        );

        this.idMesa = new FabricText(
          this.datoSimple.tableData[1].toString(), //#
          {
            strokeWidth: this.strokeWidth,
            backgroundColor: 'transparent',
            stroke: 'black',
            fill: 'black',
            left: parseInt(this.datoSimple.tableData[11].toString()) + 40,
            top: parseInt(this.datoSimple.tableData[13].toString()) + 90,
            id: this.datoSimple.tableData[1],
            selectable: false,
          }
        );

        this.canvas.add(this.mesa, this.idMesa, this.numero);
      }
    }

    if (changes['planoSelect']) {
      this.canvas.clear();
      let svgString = this.obtenerPlano(this.planoSelect.toString());
      loadSVGFromURL(svgString).then((resultSVG) => {
        this.plano = util.groupSVGElements(
          resultSVG.objects as FabricObject[],
          resultSVG.options
        );
        this.plano.set({
          left: 0,
          top: 0,
          scaleX: 3,
          scaleY: 3,
          originX: 0,
          originY: 0,
          hoverCursor: 'pointer',
          selectable: false,
        });
        this.canvas.setWidth(this.plano.getScaledWidth());
        this.canvas.setHeight(this.plano.getScaledHeight());
        this.canvas.add(this.plano);
      });
    }
  }

  obtenerPlano(name: string): string {
    return `plano-${name}.svg`;
  }

  ngAfterViewInit() {
    this.buildZone = document.getElementById('buildZone');
    this.wrapper = document.getElementById('wrapper');
    this.styleZone = document.getElementById('styleZone');
    this.paddingShift = 60;

    const clearButton = document.getElementById('clear');
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        if (!this.deleteActiveObjects()) {
          this.canvas.clear();
        }
      });
    }

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Delete') {
        this.deleteActiveObjects();
      }
    });

    this.canvas = new Canvas('canvas', { width: 700, height: 400 });
  }

  mostrarObjeto() {
    let objsBuscados = this.canvas.getObjects();
    return objsBuscados;
  }

  deleteActiveObjects() {
    const activeObjects = this.canvas.getActiveObjects();
    if (!activeObjects.length) return false;
    activeObjects.forEach((object: FabricObject) => {
      this.canvas.remove(object);
    });

    this.canvas.renderAll();
    return true;
  }

  // resizeCanvas() {
  //   // Width
  //   let newWidth = this.canvas.getWidth() + (window.innerWidth - (this.buildZone.offsetWidth + this.paddingShift));
  //   if (newWidth < 640 && newWidth > 200) this.canvas.setWidth(newWidth);
  //   // Height
  //   let newHeight = this.canvas.getHeight() + (window.innerHeight - (this.wrapper.offsetHeight + this.paddingShift));
  //   if (newHeight < 360 && newHeight > 250) this.canvas.setHeight(newHeight);
  //   window.addEventListener('resize', this.resizeCanvas.bind(this));
  // }
}
