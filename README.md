# Pokedex Rappid

Frontend hecho con React, Typescript, Redux toolkit, usando ContextAPI y custom hooks.

## _Utilice:_

- **React Router Dom:** Para navegar entre paginas.
- **Prime React:** Para la paginación.
- **Axios:** Para el consumo de API.
- **Redux Toolkit:** Para gestionar estados globales.
- **Bootstrap:** Para algunos estilos.
- **Interface de la pokedex:** Para definir la interface de los objetos de la API.

## _Sobre la web:_

La web consta de un login necesario si o si para dar o quitar los pokemons favoritos. Cada usuario podra ver sus favoritos y cerrar sesión.

La web consta de las siguientes paginas:

- **Home:** Listado de pokemons, con filtrados por nombre, tipos y ordenamiento.
- **Detalle del pokemon:** Se visualzian los detalles del pokemon, como sus habilidades, peso, estadisticas, etc.
- **Mi cuenta:** Se puede visualizar el detalle de la cuenta del usuario como nombre, email e imagen de perfil, como asi mismo el listado de pokemons que dio como favorito.

**Las ruta 'Mi cuenta' esta protegida, por lo cual no es accesible a menos que se este autenticado.**

## Instalación

Ejecutar localmente

```sh
git clone https://github.com/JonasBusto/pokedex-rappid
cd pokedex-rappid
npm install
npm run dev
```
