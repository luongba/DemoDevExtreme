none:
	echo None!
build:
	npm run build && npm run generate
image:
	docker build . -t registry.gitlab.com/sonphat/benxeonline/dieudo/dieudo_fe
tag:
	docker tag registry.gitlab.com/sonphat/benxeonline/dieudo/dieudo_fe registry.gitlab.com/sonphat/benxeonline/dieudo/dieudo_fe:$(ID)
push:
	docker push registry.gitlab.com/sonphat/benxeonline/dieudo/dieudo_fe:$(ID)
all2image:
	# @make build && 
	make image
stop_image:
	docker rm -f sonphat_qlbx_webfrontend
start_image:
	-@make stop_image || true;
	docker run \
		--rm -d --name sonphat_qlbx_webfrontend \
		-p 28080:80 \
		--env-file container.env \
		registry.gitlab.com/sonphat/benxeonline/dieudo/dieudo_fe
bash_image:
	@docker exec -it sonphat_qlbx_webfrontend /bin/bash
all2runimage:
	@make all2image && make start_image