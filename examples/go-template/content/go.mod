module ${{ values.name }}

go ${{ values.goVersion }}

require (
	github.com/gorilla/mux v1.8.0
)