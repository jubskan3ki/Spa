<template>
	<tr :style="animationStyle" class="slide-in-bounce">
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
	import { computed } from 'vue';
	import { IMAGES } from '@/config/images';
	import type { User } from '@/types/components/users/User';
	import { useModalStore } from '@/stores/modules/modalStore';

	const props = defineProps<{
		user: User;
		index: number;
	}>();

	const emit = defineEmits<{
		(e: 'deleteUser', id: string): void;
	}>();

	const modalStore = useModalStore();

	const animationStyle = computed(() => ({
		animationDelay: `${props.index * 0.1}s`,
	}));

	const onDelete = (): void => {
		modalStore.openModal({
			title: 'Confirmation',
			message: `Êtes-vous sûr de vouloir supprimer ${props.user.name} ?`,
			confirmLabel: 'Supprimer',
			cancelLabel: 'Annuler',
			onConfirm: () => emit('deleteUser', props.user.id),
		});
	};
</script>

<style scoped lang="scss">
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

	tr {
		&:hover {
			background-color: vars.$white-dark;
			box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			transform: scale(1.01);
		}

		td {
			padding: vars.$spacing-sm;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			transition:
				background-color 0.3s,
				transform 0.3s ease;
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
				transition:
					transform 0.3s ease,
					filter 0.3s ease;

				&:hover {
					transform: scale(1.3);
					filter: brightness(0) saturate(100%) invert(37%) sepia(100%) saturate(1500%) hue-rotate(350deg);
				}
			}
		}
	}
</style>
