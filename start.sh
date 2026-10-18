#!/usr/bin/env bash

# ==============================================================================
# Master Development Startup Script for Angular + NestJS Nx Monorepo
# ==============================================================================

set -e

# Terminal colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

echo -e "${CYAN}${BOLD}"
echo "=========================================================="
echo "      🚀 Fullstack Monorepo Runner (Angular + NestJS)     "
echo "=========================================================="
echo -e "${NC}"

# Check for node_modules
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}⚠️ node_modules not detected. Installing dependencies...${NC}"
  npm install
fi

MODE="${1:-all}"

case "$MODE" in
  all)
    echo -e "${GREEN}Starting both applications in parallel...${NC}"
    echo -e "${BLUE}  • Frontend (Angular):  ${BOLD}http://localhost:4200${NC}"
    echo -e "${MAGENTA}  • Backend  (NestJS):   ${BOLD}http://localhost:3000/api${NC}"
    echo -e "${MAGENTA}  • Swagger Docs:        ${BOLD}http://localhost:3000/api${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop all servers.${NC}"
    echo "----------------------------------------------------------"
    npx nx run-many -t serve -p angular backend --output-style=stream
    ;;

  angular|frontend)
    echo -e "${BLUE}Starting Angular application on http://localhost:4200...${NC}"
    npx nx serve angular
    ;;

  backend|nest|server)
    echo -e "${MAGENTA}Starting NestJS backend on http://localhost:3000/api...${NC}"
    npx nx serve backend
    ;;

  *)
    echo -e "${YELLOW}Usage: ./start.sh [all|angular|backend]${NC}"
    exit 1
    ;;
esac
