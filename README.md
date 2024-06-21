Fast and lightweight router for Vue

# Installation
```js
import SfcRouter from 'vue-sfc-router'

app.use(SfcRouter)
```

Or drop/ import the components directly in your project.

# Usage
```html
<template>
    <HistoryRouter debug=false>
        <Route path=''>
            Hello world
        </Route>
        <Route path='/products'>
            Nice product listing
        </Route>
        <Route path='/products/:id'>
            <template #default={params, query, path}>
                Product {{params.id}}
            </template>
        </Route>
        <Route path='/login' component="LoginPage"/>
        <Route path='/password/:code/'>
            <template #default={params, path}>
                {{params, path}}
            </template>
        </Route>
    </HistoryRouter>
</template>
```