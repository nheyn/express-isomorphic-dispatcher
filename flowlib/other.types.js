type Json = {[key: string]: Json} | Array<Json> | string | number | boolean;

type EncodeStateFunc<S> = (storeName: string, state: S) => Json;
type DecodeStateFunc<S> = (storeName: string, data: Json) => S;