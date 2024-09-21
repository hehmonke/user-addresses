up:
	docker compose up -d --build --remove-orphans

migrations-create:
	mikro-orm migration:create

migrations-up:
	mikro-orm migration:up

seed-up:
	mikro-orm seeder:run --class=DatabaseSeeder
