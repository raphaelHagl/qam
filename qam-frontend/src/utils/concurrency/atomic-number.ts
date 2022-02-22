const INDEX = 0;

/**
 * This class represents a signed integer with atomic operations.
 */
export class AtomicInteger {
    private valueContainer: Int32Array = new Int32Array(1);
    constructor(value: number) {
        this.valueContainer[INDEX] = value;
    }

    get value(): number {
        return Atomics.load(this.valueContainer, INDEX);
    }

    increment() {
        this.add(1);
    }

    decrement() {
        this.sub(1);
    }

    add(toAdd: number) {
        Atomics.add(this.valueContainer, INDEX, toAdd);
    }

    sub(toSubstract: number) {
        Atomics.sub(this.valueContainer, INDEX, toSubstract);
    }

    /**
     * Replaces the current value with the given one and returns the old value.
     * 
     * @param toExchange The respective value to replace the old value with.
     * @returns The old value.
     */
    exchange(toExchange: number): number {
        return Atomics.exchange(this.valueContainer, INDEX, toExchange);
    }
}