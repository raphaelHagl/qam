export type Value<TValue> = { value: TValue };
export type Error<TError> = { error: TError };

export type Result<TValue, TError> = Value<TValue> | Error<TError>;

export const ofValue = <TValue>(value: TValue): Result<TValue, any> => ({ value });

export const ofError = <TError>(error: TError): Result<any, TError> => ({ error });

export const isSuccess = <TValue, TError>(result: Result<TValue, TError>): result is Value<TValue> => 'value' in result;

export const isError = <TValue, TError>(result: Result<TValue, TError>): result is Error<TError> => 'error' in result;
