import { LinkedList } from "./LinkedList";
import { getRandomArray } from "./utils";

const linkedList = new LinkedList<number | string>();

getRandomArray().forEach((item) => {
  linkedList.append(item);
});

linkedList.append("Last");
linkedList.prepend("First");

console.log("The original linked list:");
console.table(linkedList.toArray());
console.log();

console.log("The first node in the list:", linkedList.head?.value);
console.log("The last node in the list:", linkedList.tail?.value);
console.log('The index of node "First":', linkedList.find("First"));
console.log('Does node "First" exist:', linkedList.contains("First"));

linkedList.pop()

console.log("The latest linked list:");
console.table(linkedList.toArray());
console.log();
