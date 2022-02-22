import { ofError, ofValue, Result } from "..";

const SWAP_STATE = {
    READY: 0,
    SWAPPED: 1,
};

const INDEX = 0;

/**
 * This class represents a concurrency guard implemented
 * by the means of a 'compare-and-swap' routine.
 */
export class Swap {
    private swap: Int8Array = new Int8Array(1);
    constructor() {
        this.swap[INDEX] = SWAP_STATE.READY;
    }

    /**
     * Tries to execute the given callback function.
     * The callback is only executed, when the swap is ready.
     * 
     * @param callback The respective callback function that is to be executed.
     * @returns {@code true} if the swap was ready, {@code false} otherwise.
     */
    tryExecute<TReturnValue>(callback: () => TReturnValue): Result<TReturnValue, false> {
        if (!this.swapOut()) { return ofError(false) }
        const resultValue = callback();
        this.release();
        return ofValue(resultValue);
    }

    swapOut(): boolean {
        // The expected value is SWAP_STATE.READY
        const compareResult = Atomics.compareExchange(this.swap, 0, SWAP_STATE.READY, SWAP_STATE.SWAPPED);
        return compareResult === SWAP_STATE.READY;
    }

    release() {
        // The expected value is SWAP_STATE.SWAPPED
        const compareResult = Atomics.compareExchange(this.swap, 0, SWAP_STATE.SWAPPED, SWAP_STATE.READY);
        console.assert(compareResult === SWAP_STATE.SWAPPED, 'The swap should only be released when swapped out earlier.')
    }
}