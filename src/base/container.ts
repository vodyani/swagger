import { BaseClass, Container, isValid } from '@vodyani/core';

export class VOContainer implements Container {
  private static readonly container: Map<string, BaseClass> = new Map();

  public static registry(name: string, target: any) {
    if (isValid(name) && isValid(target)) {
      this.container.set(name, target);
    }
  }

  public static discovery() {
    return this.container.size > 0 ? [...this.container.values()] : [];
  }
}
