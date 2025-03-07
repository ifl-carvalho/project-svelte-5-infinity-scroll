import type { RequestHandler } from '@sveltejs/kit';
import type { Site } from '$lib/types/sites';

import { error, json } from '@sveltejs/kit';
import PapaParse from 'papaparse';
import type { Pagination } from '$lib/types/pagination';

export type GetApiSitesResponse = {
	sites: Site[];
	pagination: Pagination;
};

export const GET: RequestHandler = async ({ fetch, url }) => {
	const searchParams = url.searchParams;
	const page = parseInt(searchParams.get('page') ?? '1', 10);
	const limit = parseInt(searchParams.get('limit') ?? '15', 10);

	const response = await fetch('/whc-sites.csv');

	if (!response.ok) return error(500, 'Failed to parse CSV');

	const text = await response.text();

	const { data, errors } = PapaParse.parse<Site>(text, { header: true });

	if (errors.length) return error(500, 'Failed to parse CSV');

	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / limit);
	const startIndex = (page - 1) * limit;
	const endIndex = startIndex + limit;

	const paginatedSites = data.slice(startIndex, endIndex);

	return json({
		sites: paginatedSites,
		pagination: {
			page,
			limit,
			totalItems,
			totalPages,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1,
			nextPage: page < totalPages ? page + 1 : null,
			prevPage: page > 1 ? page - 1 : null
		}
	});
};
