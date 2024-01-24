/**
 * An interface for linked lists, which shares the common methods.
 */
export interface ILinkedList<T> {
  isEmpty(): boolean;
  at(index: number): T | null | undefined;
  prepend(data: T): void;
  shift(): T | undefined;
  append(data: T): void;
  pop(): T | undefined;
  insertAt(index: number, data: T): void;
  removeAt(index: number): T | undefined;
  clear(): void;
  toArray(): (T | undefined)[];
}
