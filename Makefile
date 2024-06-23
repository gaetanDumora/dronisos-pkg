.PHONY: init-prisma
#  Create a Local Package
# npm init --scope @repo --workspace ./libraries/postgres -y

#  Use a Local Package Inside Another Local Package
# npm install @repo/consumer --workspace ./packages/adapter

# Add an External npm Package to a Local Package
# npm install amqplib --workspace ./libraries/rabbitmq
# Prisma
init-prisma:
	cd libraries/prisma && npx prisma migrate dev --name init && npx prisma generate 
# npx prisma init --workspace ./libraries/prisma
# cd libraries/prisma && npx prisma migrate dev --name init 
# cd libraries/prisma && npx prisma generate 