import { Type } from '@vodyani/core';

export class ExtraModelStore {
  private static readonly store: Map<string, Type> = new Map();

  public static set(name: string, target: any) {
    if (name && target) {
      this.store.set(name, target);
    }
  }

  public static get() {
    return this.store.size > 0 ? [...this.store.values()] : [];
  }
}
