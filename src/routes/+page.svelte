<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	$effect(() => {
		console.log(data.sites);
	});
</script>

<div>
	<h1
		class="mx-auto max-w-5xl p-10 text-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
	>
		Hi Traveler
	</h1>

	<main class="mx-auto grid max-w-5xl grid-cols-12 gap-4 p-10">
		{#each data.sites as site}
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
	</main>
</div>
