<template>
	<div class="search-bar">
		<input
			v-model="searchQuery"
			:type="'text'"
			:placeholder="placeholder"
			@input="handleSearch"
			aria-label="Rechercher"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import type { SearchBarProps } from '@/types/components/common/SearchBar.type';

	// Props avec valeur par défaut pour placeholder
	withDefaults(defineProps<SearchBarProps>(), {
		placeholder: 'Rechercher un utilisateur...',
	});

	const emit = defineEmits<{ (e: 'update:query', value: string): void }>();

	const searchQuery = ref('');

	const handleSearch = () => {
		emit('update:query', searchQuery.value);
	};
</script>
