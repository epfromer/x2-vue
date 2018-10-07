# x2-vue

A simple Vue.js front-end for x2-server (https://github.com/epfromer/x2-server).

# Goals

- Vue CLI to create basic app
- Vuetify instead of Bootstrap
- Datagrid (v-data-table via Vuetify) with server-side paging and row selection
- Vuex for state used by components (e.g. email list)
- Nested components
- Vue component lifecycle
- fetch() for X2-server REST calls
- Unit tests driving 90%+ code coverage

# Todo

- v-data-table slot: expand to show first lines of email
- v-data-table slot: no-data
- theme variants (dark theme)
- v-data-table selection

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Run your unit tests

```
npm run test:unit
```
