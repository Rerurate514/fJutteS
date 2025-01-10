class ShadowLevel {
  static LVL0 = new ShadowLevel('none');
  static LVL1 = new ShadowLevel('0 2px 4px rgba(0,0,0,0.1)');
  static LVL2 = new ShadowLevel('0 4px 8px rgba(0,0,0,0.12)');
  static LVL3 = new ShadowLevel('0 8px 16px rgba(0,0,0,0.14)');
  static LVL4 = new ShadowLevel('0 12px 24px rgba(0,0,0,0.16)');
  static LVL5 = new ShadowLevel('0 16px 32px rgba(0,0,0,0.18)');

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}
