type EncodeStateFunc<S> = (storeName: string, state: S) => string;
type DecodeStateFunc<S> = (storeName: string, data: string) => S;