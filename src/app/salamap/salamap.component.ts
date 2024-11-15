import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Mesa } from "../conector/conector.component";
import { Canvas, Rect, Circle, Triangle, Path, FabricText } from 'fabric';
@Component({
  selector: 'app-salamap',
  standalone: true,
  imports: [],
  templateUrl: './salamap.component.html',
  styleUrls: ['./salamap.component.css']
})
export class SalamapComponent implements OnChanges {

  @Input() dato: Record<string, Mesa>;
  canvas = new Canvas();
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
  var = console.log("variables");

  constructor() {
    this.dato = {};
    this.colors = ['#43c8bf', '#896bc8', '#e54f6b', '#a5346b', '#234f6b', '#ffffff'];
    this.defaultColor = this.colors[0];
    this.activeElement = null;
    this.isSelectedClass = 'isSelected';
    this.strokeWidth = 2;
    this.strokeColor = this.defaultColor;
    console.log("constructor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.canvas = new Canvas("canvas", { width: 640, height: 360 });
    this.canvas.clear();

    this.canvas.add(new FabricText(`desde ngOnChanges`));
    console.log("ngOnChange");
    ///////////////////////////////////

    this.buildZone = document.getElementById('buildZone');
    this.wrapper = document.getElementById('wrapper');
    this.styleZone = document.getElementById('styleZone');
    this.paddingShift = 60;
    // this.resizeCanvas();

    this.colors.forEach((color, i) => {
      let span = document.createElement('span');
      span.style.background = color;
      span.style.width = "100%";
      span.style.height = "100%";
      let icon = document.createElement('i');
      icon.className = 'feather icon-check';
      if (i === 0) {
        span.className = this.isSelectedClass;
        this.activeElement = span;
      }

      span.appendChild(icon);
      span.addEventListener('click', () => {
        console.log("clic");
        
        if (span.className !== this.isSelectedClass) {
          span.classList.toggle(this.isSelectedClass);
          if (this.activeElement) {

            this.activeElement.classList.remove(this.isSelectedClass);
          }
          this.activeElement = span;
          this.strokeColor = color;
        }
        if (this.canvas.getActiveObject()) {
          const activeObjects = this.canvas.getActiveObjects();
          if (!activeObjects.length) return;
          activeObjects.forEach((object: any) => {
            object.set('stroke', this.strokeColor);
          });
        }
        this.canvas.renderAll();
      });
      this.styleZone.appendChild(span);

    });

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

    document.getElementById('square')!.addEventListener('click', () => {
      this.canvas.add(new Rect({
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        fill: 'transparent',
        width: 50,
        height: 50,
        left: 100,
        top: 100
      }));
    });

    document.getElementById('circle')!.addEventListener('click', () => {
      this.canvas.add(new Circle({
        radius: 30,
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        fill: 'transparent',
        left: 100,
        top: 100
      }));
    });

    // Triangle
    document.getElementById('triangle')!.addEventListener('click', () => {
      this.canvas.add(new Triangle({
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        fill: 'red',
        width: 50,
        height: 50,
        left: 100,
        top: 100
      }));
    });

    document.getElementById('mesa')!.addEventListener('click', () => {
      const pathString = "M 0 0 Q 50 -50 100 0 L 100 150 Q 50 200 0 150 Z";
      const path = new Path(pathString, {
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        angle: 0,
        left: 50,
        top: 50,
        fill: 'red', // Relleno negro para el fondo
      });

      this.canvas.add(path);
    });

    this.canvas.add(new Circle({
      radius: 50,
      strokeWidth: this.strokeWidth,
      stroke: this.strokeColor,
      fill: 'transparent',
      left: 100,
      top: 200,
      selectable: true,
      hoverCursor: "hola"
    })
    );

    this.canvas.add(
      new FabricText("this.dato[1].ts.toString()", {
        textBackgroundColor: "#ffffff",
        fontSize: 20,
        left: 120,
        top: 215,
        selectable: true
      }),);

  }

  ngOnInit() {
    console.log("ngOnInit");
    this.canvas.add(new FabricText(`desde Init`, { top: 35 }));
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    let str = `sin dato`;
    this.canvas.add(new FabricText(str, { top: 70 }));
  }



  deleteActiveObjects() {
    const activeObjects = this.canvas.getActiveObjects();
    if (!activeObjects.length) return false;

    activeObjects.forEach((object: any) => {
      this.canvas.remove(object);
    });

    return true;
  }

  resizeCanvas() {
    // Width
    let newWidth = this.canvas.getWidth() + (window.innerWidth - (this.buildZone.offsetWidth + this.paddingShift));
    if (newWidth < 640 && newWidth > 200) this.canvas.setWidth(newWidth);
    // Height
    let newHeight = this.canvas.getHeight() + (window.innerHeight - (this.wrapper.offsetHeight + this.paddingShift));
    if (newHeight < 360 && newHeight > 250) this.canvas.setHeight(newHeight);
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }




}