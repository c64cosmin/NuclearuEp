import { Pump } from "../reactor";
import { GfxObject } from "./gfxobject";
import { Point2D } from "./point2d";
import { Propeller } from "./propeller";
export class GfxPump extends GfxObject<HTMLDivElement> {
  private propeller: Propeller;
  private pumpBody: HTMLImageElement;

  public constructor(
    parent: HTMLElement,
    position: Point2D,
    private state: Pump,
  ) {
    super(parent, position);
    this.propeller = new Propeller(this.element, { x: 0, y: 0 });
    this.pumpBody = document.createElement("img");
    this.pumpBody.src = "img/pump.svg";
    this.element.appendChild(this.pumpBody);
  }

  protected getElement(): HTMLDivElement {
    return document.createElement("div");
  }

  public update() {
    this.propeller.speed = this.state.speed / 10;
  }
}
