import { Class, StoreContainer } from '@vodyani/core';

export class VOContainer implements StoreContainer {
  private static readonly container: Map<string, Class> = new Map();

  public static registry(name: string, target: any) {
    if (name && target) {
      this.container.set(name, target);
    }
  }

  public static discovery() {
    return this.container.size > 0 ? [...this.container.values()] : [];
  }
}
