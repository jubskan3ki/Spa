<template>
	<div class="search-bar">
		<input
			v-model="searchQuery"
			type="text"
			placeholder="Rechercher un utilisateur..."
			@input="onSearch"
			aria-label="Rechercher un utilisateur"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, defineEmits } from 'vue';

	const searchQuery = ref('');
	const emit = defineEmits(['update:query']);

	const onSearch = () => {
		emit('update:query', searchQuery.value);
	};
</script>
