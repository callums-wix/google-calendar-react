type Observer<StateObject> = (state: StateObject) => void | StateObject;

export class Subject<StateObject> {
  private observers: Observer<StateObject>[];
  constructor(private state: StateObject) {
    this.observers = [];
  }

  public setState<Key extends keyof StateObject>(key: Key, value: StateObject[Key]) {
    this.state = { ...this.state, [key]: value };
    this.notify();
  }

  public getValue<Key extends keyof StateObject>(value: Key): StateObject[Key] {
    return this.state[value];
  }

  public subscribe(observer: Observer<StateObject>): void {
    if (!this.observers.some((obs) => obs.name === observer.name)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: Observer<StateObject>): void {
    this.observers = this.observers.filter((obs) => obs.name !== observer.name);
  }

  protected notify(): void {
    for (const observer of this.observers) {
      observer(this.state);
    }
  }
}
