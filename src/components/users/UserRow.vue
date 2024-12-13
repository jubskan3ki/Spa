<template>
	<tr>
		<td class="icon-cell">
			<img :src="IMAGES.ICONS.PERSO" alt="Icône utilisateur" />
		</td>
		<td>{{ user.name }}</td>
		<td>{{ user.job }}</td>
		<td>{{ user.email }}</td>
		<td>{{ user.phone }}</td>
		<td>
			<button @click="onDelete" class="delete-btn">
				<img :src="IMAGES.ICONS.TRASH" alt="Supprimer" />
			</button>
		</td>
	</tr>
</template>

<script setup lang="ts">
	import { IMAGES } from '@/config/images';
	import type { User } from '@/types/User';

	const props = defineProps<{
		user: User;
	}>();
	const emit = defineEmits(['deleteUser']);

	const onDelete = () => emit('deleteUser', props.user.id);
</script>

<style scoped lang="scss">
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

	tr {
		&:hover {
			background-color: vars.$white-dark;
		}

		td {
			padding: vars.$spacing-sm;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.icon-cell {
		width: 40px;
		text-align: center;

		img {
			width: 40px;
			height: 40px;
		}
	}

	.delete-btn {
		background: transparent;
		border: none;
		cursor: pointer;

		img {
			width: 20px;
			height: 20px;
		}
	}
</style>
