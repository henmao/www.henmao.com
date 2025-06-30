---
slug: design-pattern
title: Design Pattern
authors: [shanks]
tags: [design-pattern]
---

常用设计模式

<!-- truncate -->

## 创建型

### 单例

```ts
class Singleton {
  static _instance: Singleton;
  private constructor() { }
  public static get instance(): Singleton {
    if(Singleton._instance) {
      Singleton._instance = new Singleton();
    }
    return Singleton._instance;
  }
}
```

### 原型

```ts
interface IGame<T> {
  clone(): T;
}
class Game implements IGame<Game> {
  constructor(private name: string) {}

  clone(): Game {
    return new Game(this.name)
  }
}
```

## 结构型

## 行为型 
