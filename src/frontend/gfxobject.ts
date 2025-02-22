import { Point2D } from "./point2d";

export abstract class GfxObject<T extends HTMLElement> {
  protected element: T;

  public constructor(
    private parent: HTMLElement,
    private position: Point2D,
  ) {
    this.element = this.getElement();
    this.parent.appendChild(this.element);
  }

  protected abstract getElement(): T;

  public abstract update(): void;
}
