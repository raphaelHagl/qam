// TODO: decide whether to devide synchronous and asynchronous calls
export type MaybeComputed<TValue> = TValue | (() => TValue | Promise<TValue>);

/**
 * Evaluates the value of the given a {@link MaybeComputed}.
 * 
 * @param maybeComputed The respective MaybeComputed to evalute.
 * @returns The value, if a concrete instance is given,
 * else executes the function and returns the resulting value.
 * 
 */
export const evaluateMaybeComputed = async <TValue>(maybeComputed: MaybeComputed<TValue>): Promise<TValue> => {
    if (typeof maybeComputed !== 'function') {
        return maybeComputed;
    }

    const computationResult = await (maybeComputed as (() => TValue | Promise<TValue>))();
    return computationResult;
};