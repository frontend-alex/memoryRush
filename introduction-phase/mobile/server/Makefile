tag?=Latest

build: 
	docker build -t backend:$(tag) .

run:
	docker run -d -p 3000:3000 --name memoryRushBackend backend:$(tag)

stop: 
	docker stop memoryRushBackend && docker remove memoryRushBackend