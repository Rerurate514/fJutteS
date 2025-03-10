export class ShadowLevel {
  static LVL0 = new ShadowLevel('none');
  static LVL1 = new ShadowLevel('0px 0px 4px rgba(0,0,0,0.1)');
  static LVL2 = new ShadowLevel('0px 0px 8px rgba(0,0,0,0.12)');
  static LVL3 = new ShadowLevel('0px 0px 16px rgba(0,0,0,0.14)');
  static LVL4 = new ShadowLevel('0px 0px 24px rgba(0,0,0,0.16)');
  static LVL5 = new ShadowLevel('0px 0px 32px rgba(0,0,0,0.18)');
  static LVL6 = new ShadowLevel('0px 0px 40px rgba(0,0,0,0.20)');
  static LVL7 = new ShadowLevel('0px 0px 48px rgba(0,0,0,0.22)');
  static LVL8 = new ShadowLevel('0px 0px 56px rgba(0,0,0,0.24)');
  static LVL9 = new ShadowLevel('0px 0px 64px rgba(0,0,0,0.26)');
  static LVL10 = new ShadowLevel('0px 0px 72px rgba(0,0,0,0.28)');

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}
