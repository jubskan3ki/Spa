<template>
	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th></th>
					<th @click="onSort('name')" class="th-name">NOM <img :src="sortIcon" alt="Trier par nom" /></th>
					<th>MÉTIER</th>
					<th>EMAIL</th>
					<th>TÉLÉPHONE</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<UserRow v-for="user in users" :key="user.id" :user="user" @deleteUser="onDeleteUser" />
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import UserRow from '@/components/users/UserRow.vue';
	import { IMAGES } from '@/config/images';
	import type { User } from '@/types/User';

	defineProps<{ users: User[] }>();
	const emit = defineEmits(['deleteUser', 'sortUsers']);

	const sortDirection = ref<'asc' | 'desc'>('asc');
	const sortIcon = ref(IMAGES.ICONS.ARROW_TOP);

	const onSort = (key: string) => {
		sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
		sortIcon.value = sortDirection.value === 'asc' ? IMAGES.ICONS.ARROW_TOP : IMAGES.ICONS.ARROW_DOWN;
		emit('sortUsers', { key, direction: sortDirection.value });
	};

	const onDeleteUser = (id: string) => emit('deleteUser', id);
</script>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;
	@use '@/styles/mixins' as mix;

	.table-container {
		width: 100%;
		overflow-x: auto;
	}

	.th-name {
		cursor: pointer;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: vars.$spacing-md;

		thead {
			th {
				padding: vars.$spacing-sm;
				text-align: left;
				white-space: nowrap;

				img {
					margin-left: vars.$spacing-xs;
					width: 20px;
					height: 20px;
					vertical-align: middle;
				}
			}
		}

		@include mix.responsive(vars.$breakpoint-tablet) {
			th,
			td {
				padding: vars.$spacing-xs;
			}
		}

		@include mix.responsive(vars.$breakpoint-mobile) {
			th,
			td {
				padding: vars.$spacing-xxs;
			}
		}
	}
</style>
