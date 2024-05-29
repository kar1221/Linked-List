class LinkedList<T> {
  private headNode: ListNode<T> | null = null;

  private tailNode: ListNode<T> | null = null;

  private size: number = 0;

  public Append(value: T): void {
    const listNode = new ListNode(value);
    if (!this.headNode) {
      this.headNode = listNode;
      this.tailNode = listNode;
    } else {
      this.tailNode!.nextNode = listNode;
      this.tailNode = listNode;
    }

    this.size += 1;
  }

  public Prepend(value: T): void {
    if (!this.headNode) {
      this.Append(value);
    } else {
      const listNode = new ListNode(value);
      listNode.nextNode = this.headNode;
      this.headNode = listNode;
    }

    this.size += 1;
  }

  get Head(): ListNode<T> | null {
    return this.headNode;
  }

  get Tail(): ListNode<T> | null {
    return this.tailNode;
  }

  get Size(): number {
    return this.size;
  }

  public ToString(): string {
    if (!this.headNode) {
      return "";
    }

    let target: ListNode<T> | null = this.headNode;
    let tempString = "";

    while (target) {
      tempString += `${target.value} -> `;
      target = target.nextNode;
    }

    return tempString;
  }

  public At(index: number): ListNode<T> | null {
    if (!this.headNode || index >= this.size || index < 0) return null;

    let target: ListNode<T> = this.headNode;

    for (let x = 0; x < index; x++) {
      target = target.nextNode!;
    }

    return target;
  }

  public Pop(): void {
    if (!this.headNode || !this.tailNode) return;

    if(this.size === 1) {
      this.headNode = null;
      this.tailNode = null;
    } else {
      const lastTwoNode = this.At(this.size - 1 - 1);
      lastTwoNode!.nextNode = null;
    }
    
    this.size -= 1;
  }

  public Shift(): void {
    if (!this.headNode) return;

    if (this.size < 2) {
      this.Pop();
    }

    const secondNode = this.At(1);

    this.headNode.nextNode = null;
    this.headNode = secondNode;
    this.size -= 1;
  }

  public Contains(value: T): boolean {
    for (let x = 0; x < this.size; x++) {
      const currentNode = this.At(x);

      if (currentNode!.value === value) return true;
    }

    return false;
  }

  public Find(value: T): number | null {
    for (let x = 0; x < this.size; x++) {
      const currentNode = this.At(x);

      if (currentNode!.value === value) return x;
    }

    return null;
  }

  public InsertAt(value: T, index: number): void {
    if (index >= this.size || index < 0) {
      return;
    } else if (index === 0) {
      this.Prepend(value);
      return;
    }

    const targetNode = this.At(index);
    const previousNode = this.At(index - 1);

    const newNode = new ListNode(value);
    newNode.nextNode = targetNode;
    previousNode!.nextNode = newNode;

    this.size += 1;
  }

  public RemoveAt(index: number): void {
    if (index >= this.size || index < 0) {
      return;
    }

    const previousNode = this.At(index - 1);
    const targetNode = this.At(index);
    const nextNode = this.At(index + 1);

    previousNode!.nextNode = nextNode;

    targetNode!.nextNode = null;
    this.size -= 1;
  }
}

class ListNode<T> {
  public value: T;

  public nextNode: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

