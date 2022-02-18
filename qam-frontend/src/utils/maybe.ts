export type MaybeComputed<TValue> = { value: TValue } | (() => TValue | Promise<TValue>);

/**
 * Evaluates the value of the given a {@link MaybeComputed}.
 * 
 * @param maybeComputed The respective MaybeComputed to evalute.
 * @returns The value, if a concrete instance is given,
 * else executes the function and returns the resulting value.
 * 
 */
export const evaluateMaybeComputed = async <TValue>(maybeComputed: MaybeComputed<TValue>): Promise<TValue> => {
    if ('value' in maybeComputed) {
        return maybeComputed.value;
    }

    const computationResult = await maybeComputed();
    return computationResult;
};