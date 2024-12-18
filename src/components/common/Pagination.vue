<template>
	<div class="pagination">
		<button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
			<img :src="prevIcon" alt="Précédent" class="arrow" />
		</button>
		<span
			v-for="page in displayedPages"
			:key="page"
			:class="{ active: currentPage === page }"
			@click="changePage(page)"
		>
			{{ page }}
		</span>
		<button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
			<img :src="nextIcon" alt="Suivant" class="arrow" />
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { PaginationProps, PaginationEmits } from '@/types/components/common/Pagination.type';

	const props = defineProps<PaginationProps>();
	const emit = defineEmits<PaginationEmits>();

	// Changer de page
	const changePage = (page: number) => {
		if (page >= 1 && page <= props.totalPages) {
			emit('pageChange', page);
		}
	};

	// Pages à afficher
	const displayedPages = computed(() => {
		const pages: number[] = [];
		const maxVisiblePages = 5;

		let start = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
		let end = Math.min(props.totalPages, start + maxVisiblePages - 1);

		if (end - start < maxVisiblePages) start = Math.max(1, end - maxVisiblePages + 1);

		for (let i = start; i <= end; i++) pages.push(i);

		return pages;
	});
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: vars.$spacing-sm;
		margin-top: vars.$spacing-md;

		button {
			background: vars.$white;
			padding: vars.$spacing-xs vars.$spacing-sm;
			cursor: pointer;
			transition: all 0.3s ease;

			.arrow {
				width: 20px;
				height: 20px;
				transition: transform 0.3s ease;
				transform: rotate(-90deg);
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.5;
			}
		}

		span {
			padding: vars.$spacing-xs vars.$spacing-sm;
			border-radius: vars.$spacing-xxs;
			cursor: pointer;
			transition:
				background-color 0.3s ease,
				transform 0.2s ease;

			&.active {
				background-color: vars.$primary-color;
				color: vars.$white;
				font-weight: bold;
			}
		}
	}
</style>
