import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Mesa } from "../conector/conector.component";
import { Canvas, Rect, Circle, Triangle, Path, loadSVGFromString } from 'fabric';
@Component({
  selector: 'app-salamap',
  standalone: true,
  imports: [],
  templateUrl: './salamap.component.html',
  styleUrls: ['./salamap.component.css']
})
export class SalamapComponent implements OnChanges {

  @Input() dato: Mesa = {} as Mesa;
  dat: any;
  val = 0;
  canvas: any;
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

  constructor() {
    this.dato = {} as Mesa;
    this.colors = ['#43c8bf', '#896bc8', '#e54f6b', '#a5346b', '#234f6b', '#ffffff'];
    this.defaultColor = this.colors[0];
    this.activeElement = null;
    this.isSelectedClass = 'isSelected';
    this.strokeWidth = 2;
    this.strokeColor = this.defaultColor;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dato']?.firstChange === false) {
      console.log(this.dato);
      this.val++;
      this.canvas.add(new Circle({
        radius: 30,
        strokeWidth: this.strokeWidth,
        stroke: this.strokeColor,
        fill: 'transparent',
        left: 100,
        top: 100
      }));
      this.dat = `JSON.stringify(this.datos) ${this.val}`;
    }
    if (changes['dato']?.firstChange === true) {
      console.log(this.dato);
      this.val += 2;
      
      this.dat = `JSON.stringify(this.datos) ${this.val}`;
    }


  }

  ngAfterViewInit() {
    console.log(this.dato);

    this.canvas = new Canvas("canvas", { width: 640, height: 360 });
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
          this.canvas.renderAll();

        }
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

    // document.getElementById('otraMesa')!.addEventListener('click', () => {
    //   const pathString = "<svg width='209' height='467' viewBox='0 0 209 467' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_7_10)'><rect width='210' height='467' rx='78' fill='black' style='fill:black;fill-opacity:1;'/><rect x='10' y='8' width='189' height='449' rx='78' fill='#DF1515' style='fill:#DF1515;fill:color(display-p3 0.8750 0.0839 0.0839);fill-opacity:1;'/><rect width='143' height='277' rx='43' transform='matrix(1 0 0 -1 33 435)' fill='#003E00' style='fill:#003E00;fill:color(display-p3 0.0000 0.2417 0.0000);fill-opacity:1;'/><circle cx='103' cy='86' r='68' fill='#B39316' style='fill:#B39316;fill:color(display-p3 0.7000 0.5775 0.0875);fill-opacity:1;'/><circle cx='103' cy='86' r='59' fill='#DF1515' style='fill:#DF1515;fill:color(display-p3 0.8745 0.0824 0.0824);fill-opacity:1;'/></g><defs><clipPath id='clip0_7_10'><rect width='209' height='467' fill='white' style='fill:white;fill-opacity:1;'/></clipPath></defs></svg>";
    //   console.log("otra mesa");
    //   loadSVGFromString(pathString, (result) => {
    //     const clonedObjects = result.objects.map((object) => this.canvas.util.object.clone(object));
    //     this.canvas.add(...clonedObjects);
    //     clonedObjects.forEach((object) => object.centerH().centerV());
    //   });
    // });

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