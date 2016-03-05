/**
 * @flow
 */
export const DEFAULT_PATH = '/dispatch/';
export function DEFAULT_ENCODE(_: string, data: Object): string {
	return JSON.stringify(data);
}
export function DEFAULT_DECODE(_: string, data: string): Object {
	return JSON.parse(data);
}

export default {
	path: DEFAULT_PATH,
	encode: DEFAULT_ENCODE,
	decode: DEFAULT_DECODE
};