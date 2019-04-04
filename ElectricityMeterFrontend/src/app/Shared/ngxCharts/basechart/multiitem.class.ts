export class MultiItem<N, M> {
  public value: N;
  public name: M;

  constructor(value: N, name: M) {
    this.value = value;
    this.name = name;
  }
}
