import logger from './logger.ts';
import axiod from 'https://deno.land/x/axiod@0.24/mod.ts';

export async function makeHttpRequest(
	uri: string,
	method: string,
	params?: Record<string, any>,
	headers?: Record<string, string>,
	body?: any
) {
	let error;
	const res = await axiod(uri, {
		method,
		params: params,
		headers,
		data: body,
	}).catch((err) => (error = err));

	const status = res.status || res.response.status;
	if (status === 200) return res.data;

	logger.error(
		`makeHttpRequest -> Status: ${
			res.status
		}, URI: ${uri}, Method: ${method}, Params: ${JSON.stringify(
			params
		)}, Headers: ${JSON.stringify(headers)}, Body: ${JSON.stringify(body)}`
	);

	return null;
}
