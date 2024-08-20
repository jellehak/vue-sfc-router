/**
 * @example 
 * extractQuery('#/products/1?price=1&color=green&color=blue') 
 * => 
 * {price: 1, color: ['green', 'blue']}
 */
export function extractQuery(query = "") {
    const queryIndex = query.indexOf('?')
    if (queryIndex === -1) {
        return {}
    }
    const queryString = query.slice(queryIndex + 1)
    const params = new URLSearchParams(queryString)

    const _params = {}
    params.forEach((value, key) => {
        if (_params[key]) {
            if (Array.isArray(_params[key])) {
                _params[key].push(value)
            } else {
                _params[key] = [_params[key], value]
            }
        } else {
            _params[key] = value
        }
    })
    return _params
}

/**
 * @example extractVariables('/user/:id', '/user/5') // would yield {id:5}
 * @param {*} path 
 * @param {*} matchedPath 
 */
export function extractVariables (path = "", matchedPath = "") {
    const pathSegments = path.split('/')
    const matchedSegments = matchedPath.split('/')
    const variables = {}

    pathSegments.forEach((segment, i) => {
        if (segment.startsWith(':')) {
            const variableName = segment.slice(1)
            const variableValue = matchedSegments[i]
            variables[variableName] = variableValue
        }
    })

    return variables
}