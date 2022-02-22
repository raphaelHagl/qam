import { isSuccess } from "../result";
import { Swap } from "./swap";

const STANDARD_CAPACITY = 10;

/**
 * This class implements a non-blocking concurrent queue
 * using a simple compare-and-swap mechanism.
 * 
 * The operatoins are:
 * - lock-free
 * - linearizable
 * - not wait-free
 */
export class NonBlockingQueue<TValue> {
    private items: Array<TValue>;

    private swap: Swap = new Swap();

    constructor(expectedCapacity?: number) {
        const capacity = expectedCapacity ?? STANDARD_CAPACITY;
        this.items = new Array<TValue>(capacity);
    }

    dequeue(): TValue | undefined {
        if (this.items.length === 0) { return undefined; }
        while (true) {
            const result = this.swap.tryExecute(this.items.shift);
            if (isSuccess(result)) {
                return result.value;
            }
        }
    }

    enqueue(item: TValue): void {
        while (!isSuccess(this.swap.tryExecute(() => this.items.push(item)))) { }
    }

    size(): number {
        return this.items.length;
    }
}
