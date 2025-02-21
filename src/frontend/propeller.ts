import { Point2D } from "./point2d";
export class Propeller {
  private img?: HTMLImageElement;
  private _speed: number = 0;

  public constructor(
    private parent: HTMLElement,
    position: Point2D,
  ) {
    this.img = document.createElement("img");
    this.img.src = "img/propeller.svg";
    this.img.className = "propeller";
    this.parent.appendChild(this.img);
  }

  public set speed(value: number) {
    this._speed = value;
    if (this.img) {
      const rotationSpeed = value === 0 ? 0 : 4 / value;
      const anim = `rotate ${rotationSpeed}s linear infinite`;
      this.img.style.animation = anim;
    }
  }
  public get speed() {
    return this._speed;
  }
}
