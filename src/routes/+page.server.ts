import type { PageServerLoad } from './$types';
import type { GetApiSitesResponse } from './api/sites/+server';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch('/api/sites');
	const data: GetApiSitesResponse = await response.json();
	return { ...data };
};
