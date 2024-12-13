<template>
	<section class="not-found" role="alert" aria-live="polite">
		<h1 class="error-code">404</h1>
		<p class="message">Oups ! La page que vous recherchez n'existe pas.</p>
		<router-link to="/" class="return-link">Retour à l'accueil</router-link>
	</section>
</template>

<style lang="scss" scoped>
	@use '@/styles/variables' as vars;

	.not-found {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80vh;
		text-align: center;

		.error-code {
			font-weight: bold;
			color: vars.$danger-color;
			margin-bottom: vars.$spacing-md;
		}

		.message {
			color: #555;
			margin-bottom: 2rem;
		}

		.return-link {
			color: vars.$danger-color;
			font-weight: bold;
			text-decoration: none;
			border: 1px solid vars.$danger-color;
			padding: vars.$spacing-sm vars.$spacing-md;
			border-radius: 4px;
			transition: all 0.3s ease-in-out;

			&:hover {
				background-color: vars.$danger-color;
				color: white;
			}
		}
	}
</style>
