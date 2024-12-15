<template>
	<div class="table-container">
		<!-- Tableau des utilisateurs -->
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
				<UserRow
					v-for="(user, index) in paginatedUsers"
					:key="user.id"
					:user="user"
					:index="index"
					@deleteUser="onDeleteUser"
				/>
			</tbody>
		</table>

		<!-- Pagination -->
		<Pagination
			:currentPage="currentPage"
			:totalPages="totalPages"
			:prevIcon="IMAGES.ICONS.ARROW_TOP"
			:nextIcon="IMAGES.ICONS.ARROW_DOWN"
			@pageChange="changePage"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import UserRow from '@/components/users/UserRow.vue';
	import Pagination from '@/components/common/Pagination.vue';
	import { IMAGES } from '@/config/images';
	import { useUserStore } from '@/stores/modules/userStore';

	const emit = defineEmits(['sortUsers', 'deleteUser']);
	const userStore = useUserStore();
	const sortDirection = ref<'asc' | 'desc'>('asc');
	const sortIcon = ref(IMAGES.ICONS.ARROW_TOP);

	const currentPage = computed(() => userStore.currentPage);
	const totalPages = computed(() => userStore.totalPages);
	const paginatedUsers = computed(() => userStore.paginatedUsers);

	const changePage = (page: number) => {
		if (page >= 1 && page <= totalPages.value) {
			console.log(`Changement de page vers : ${page}`);
			userStore.setPage(page);
		}
	};

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

		table {
			width: 100%;
			border-collapse: collapse;

			thead {
				th {
					padding: vars.$spacing-sm;
					text-align: left;

					img {
						margin-left: vars.$spacing-xs;
						width: 16px;
						height: 16px;
						transition: transform 0.3s;
					}
				}
			}
		}
	}
</style>
