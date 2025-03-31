.PHONY: help dev prod down seed clean logs

# Cores
YELLOW=\033[0;33m
NC=\033[0m # No Color

help: ## Mostra ajuda
	@echo "$(YELLOW)Sistema Solar Explorer - Comandos de Desenvolvimento$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

dev: ## Inicia ambiente de desenvolvimento
	@echo "Iniciando ambiente de desenvolvimento..."
	@docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

prod: ## Inicia ambiente de produção
	@echo "Iniciando ambiente de produção..."
	@docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

down: ## Para todos os serviços
	@echo "Parando todos os serviços..."
	@docker-compose down

seed: ## Executa script de importação de dados
	@echo "Executando seed de dados..."
	@docker-compose exec backend npm run data:import

clean: ## Remove containers, imagens e volumes
	@echo "Removendo containers, imagens e volumes..."
	@docker-compose down -v --rmi all

logs: ## Exibe logs de todos os serviços
	@echo "Exibindo logs..."
	@docker-compose logs -f 