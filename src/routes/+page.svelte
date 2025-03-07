<script lang="ts">
	import type { PageProps } from './$types';

	import InfinityScroll from '$lib/components/infinity-scroll.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let { data }: PageProps = $props();

	let { sites, pagination } = $state(data);

	async function fetchData() {
		const searchParams = new URLSearchParams();
		searchParams.append('page', String(pagination.nextPage ?? 1));

		const response = await fetch(`/api/sites?${searchParams.toString()}`);
		const data = await response.json();

		sites = [...sites, ...data.sites];
		pagination = data.pagination;
	}
</script>

<div>
	<h1
		class="mx-auto max-w-5xl p-10 text-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
	>
		{m.hi_traveler()}
	</h1>

	<main class="mx-auto grid max-w-5xl grid-cols-12 gap-4 p-10">
		{#each sites as site}
			<a
				target="_blank"
				href={`https://maps.google.com/maps?z=12&t=m&q=loc:${site.latitude}+${site.longitude}`}
				class="col-span-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100 md:col-span-4 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{site.name_en}
				</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400">
					{@html site.short_description_en}
				</p>
			</a>
		{/each}
		<InfinityScroll isActive={pagination.hasNextPage} {fetchData} />
	</main>
</div>
