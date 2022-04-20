/**
 * In memory class to manage temporary data.
 */
export default class Memory {
  /**
   * Come as You Are my foolish memoria.
   */
  private static cya: Map<string, any>;

  private static getCYA(): Map<string, any> {
    if (Memory.cya == null) {
      Memory.cya = new Map();
    }

    return Memory.cya;
  }

  static get<T = any>(key: string): T {
    return this.getCYA().get(key);
  }

  static set(key: string, value: any): void {
    this.getCYA().set(key, value);
  }

  static delete(key: string): void {
    this.getCYA().delete(key);
  }
}
