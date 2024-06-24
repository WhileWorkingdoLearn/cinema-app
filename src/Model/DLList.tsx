export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export default class DLList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length: number = 0;

  addFirst(value: T): void {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  addLast(value: T): void {
    const newNode = new Node(value);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  removeFirst(): T | null {
    if (!this.head) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return value;
  }

  removeLast(): T | null {
    if (!this.tail) {
      return null;
    }
    const value = this.tail.value;
    this.tail = this.tail.prev;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return value;
  }

  find(value: T): Node<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  remove(value: T): boolean {
    const node = this.find(value);
    if (!node) {
      return false;
    }
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    this.length--;
    return true;
  }

  toArray(): T[] {
    const array: T[] = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  fromArray(values: T[]): void {
    for (const value of values) {
      this.addLast(value);
    }
  }

  getSize(): number {
    return this.length;
  }

  createIterator(startIndex: number, endIndex: number): IterableIterator<T> {
    const self = this; // Bind this outside the generator function
    let currentIndex = startIndex % this.length;
    if (currentIndex < 0) currentIndex += this.length;

    const isForward = endIndex >= 0;
    let steps = isForward ? endIndex - startIndex : startIndex - endIndex;
    if (steps < 0) steps += this.length;

    return {
      [Symbol.iterator]: function* () {
        let currentNode: Node<T> | null = self.head;
        for (let i = 0; i < currentIndex; i++) {
          if (currentNode) currentNode = currentNode.next;
        }

        while (steps >= 0) {
          if (currentNode) {
            yield currentNode.value;
            currentNode = isForward ? currentNode.next : currentNode.prev;
            if (!currentNode) {
              currentNode = isForward ? self.head : self.tail;
            }
          }
          steps--;
        }
      },
    } as IterableIterator<T>;
  }

  traverseFromTo(startIndex: number, endIndex: number): T[] {
    const result: T[] = [];
    const iterator = this.createIterator(startIndex, endIndex);

    for (let value of iterator) {
      result.push(value);
    }

    return result;
  }
}
