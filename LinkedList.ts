import type { ILinkedList } from "./interfaces/ILinkedList";

/**
 * This is an implementation of a Doubly Linked List.
 * A Doubly Linked List is a data structure that contains a `head`, `tail` and `size` property.
 * Linked Lists consist of nodes, and each node has a value and a pointer to the next and previous node (can be null).
 *
 * @see https://www.geeksforgeeks.org/doubly-linked-list/
 *
 * @template T The type of the value of the nodes.
 * @property `head` The head of the list.
 * @property `tail` The tail of the list.
 * @property `size` The size of the list.
 */
export class LinkedList<T> implements ILinkedList<T> {
  private _head?: LinkedListNode<T>;
  private _tail?: LinkedListNode<T>;
  private _size: number = 0;

  public get head(): LinkedListNode<T> | undefined {
    return this._head;
  }

  public get tail(): LinkedListNode<T> | undefined {
    return this._tail;
  }

  /**
   * Gets the size of the list.
   *
   * @returns The size of the list.
   */
  public get size(): number {
    return this._size;
  }

  /**
   * Checks if the list is empty.
   *
   * @returns {boolean} Whether the list is empty or not.
   */
  isEmpty(): boolean {
    return !this._head;
  }

  /**
   * Gets a value of a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index of the node.
   * @returns The value of a node at the specified index.
   */
  at(index: number): T | null {
    if (index < 0 || index >= this._size) {
      return null;
    }

    let currentNode: LinkedListNode<T> | undefined = this._head;
    for (let i: number = 0; i < index; i++) {
      currentNode = currentNode?.next;
    }

    return currentNode?.value ?? null;
  }

  /**
   * Inserts a node at the head of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  prepend(value: T): void {
    const newNode = new LinkedListNode(value);

    if (!this._head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this._head.prev = newNode;
      newNode.next = this._head;
      this._head = newNode;
    }

    this._size++;
  }

  /**
   * Removes a node from the head of the list.
   * Time complexity: O(1)
   *
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the list is empty.
   */
  shift(): T {
    if (!this._head) {
      throw new Error("Index out of bounds");
    }

    const removedNode = this._head;

    if (this._head === this._tail) {
      this._tail = undefined;
    } else {
      this._head.next!.prev = undefined;
    }

    this._head = this._head.next;
    this._size--;

    return removedNode.value;
  }

  /**
   * Inserts a node at the tail of the list.
   * Time complexity: O(1)
   *
   * @param value The value of the node being inserted.
   */
  append(value: T): void {
    const newNode = new LinkedListNode(value);

    if (!this._head) {
      this._head = newNode;
    } else {
      this._tail!.next = newNode;
      newNode.prev = this._tail;
    }

    this._tail = newNode;
    this._size++;
  }

  /**
   * Removes a node from the tail of the list.
   * Time complexity: O(1)
   *
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the list is empty.
   */
  pop(): T {
    if (!this._head) {
      throw new Error("Index out of bounds");
    }

    const removedNode = this._tail;

    if (this._head === this._tail) {
      this._head = undefined;
    } else {
      this._tail!.prev!.next = undefined;
    }

    this._tail = this._tail!.prev;
    this._size--;

    return removedNode!.value;
  }

  /**
   * Inserts a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index where the node will be inserted.
   * @param value The value of the node being inserted.
   * @throws Index out of bounds if the index is not valid.
   */
  insertAt(index: number, value: T): void {
    if (index < 0 || index > this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this._size) {
      this.append(value);
      return;
    }

    const newNode = new LinkedListNode(value);
    let prevNode: LinkedListNode<T> | undefined = this._head;
    for (let i: number = 0; i < index - 1; i++) {
      prevNode = prevNode?.next;
    }
    const nextNode = prevNode?.next;

    prevNode!.next = newNode;
    newNode.prev = prevNode;
    newNode.next = nextNode;
    nextNode!.prev = newNode;

    this._size++;
  }

  /**
   * Removes a node at a specific index.
   * Time complexity: O(n)
   *
   * @param index The index of the node to be removed.
   * @returns The value of the node that was removed.
   * @throws Index out of bounds if the index is not valid.
   */
  removeAt(index: number): T {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      return this.shift();
    }

    if (index === this._size - 1) {
      return this.pop();
    }

    let removedNode: LinkedListNode<T> | undefined = this._head;
    for (let i: number = 0; i < index; i++) {
      removedNode = removedNode?.next;
    }
    removedNode!.prev!.next = removedNode!.next;
    removedNode!.next!.prev = removedNode!.prev;

    this._size--;

    return removedNode!.value;
  }

  /**
   * Reverses the list.
   * Time complexity: O(n)
   *
   * @returns The reversed list or null if the list is empty.
   */
  reverse(): LinkedList<T> | null {
    if (!this._head) {
      return null;
    }

    let currentNode: LinkedListNode<T> | undefined = this._head;
    let nextNode: LinkedListNode<T> | undefined = undefined;
    let prevNode: LinkedListNode<T> | undefined = undefined;

    while (currentNode) {
      nextNode = currentNode.next;
      prevNode = currentNode.prev;

      currentNode.next = prevNode;
      currentNode.prev = nextNode;

      prevNode = currentNode;
      currentNode = nextNode;
    }

    this._tail = this._head;
    this._head = prevNode;

    return this;
  }

  /**
   * Clears the list.
   */
  clear(): void {
    this._head = undefined;
    this._tail = undefined;
    this._size = 0;
  }

  /**
   * Converts the list to an array.
   *
   * @returns The array representation of the list.
   */
  toArray(): T[] {
    const array: T[] = [];

    let currentNode: LinkedListNode<T> | undefined = this._head;

    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return array;
  }

  find(value: T): number | undefined {
    let currentNode: LinkedListNode<T> | undefined = this._head;
    let index = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return ++index;
      }

      currentNode = currentNode.next;
    }
  }

  contains(value: T): boolean {
    return !!this.find(value);
  }
}

/**
 * Represents a node in a doubly linked list.
 *
 * @template T The type of the value stored in the node.
 * @property value The value stored in the node.
 * @property next The next node after this node.
 * @property prev The previous node before this node.
 */
class LinkedListNode<T> {
  constructor(
    public value: T,
    public next?: LinkedListNode<T>,
    public prev?: LinkedListNode<T>
  ) {}
}
