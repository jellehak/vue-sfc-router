Lightweight router for Vue

# Installation
```js
import SfcRouter from 'vue-sfc-router'

app.use(SfcRouter)
```

You can also import the components directly in your project.

```js
import {HashRouter, Route} from 'vue-sfc-router'
```

# Usage
```html
<template>
    <HashRouter debug=false>
        <Route path=''>
            <Redirect to='/' />
        </Route>
        <Route path='/'>
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
    </HashRouter>
</template>
```
