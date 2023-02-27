const queries = (req, res, next) => {
    const filterObject = req.query
    for (let key in filterObject) {
        if (filterObject[key] === '') {
            delete filterObject[key]
        }
    }
    
    if ('height' in filterObject){
        if (filterObject.height === 'short') {
            filterObject.height = { $lte: 20 }
        } else if (filterObject.height === 'medium') {
            filterObject.height = { $lte: 40, $gte: 20 }
        } else if (filterObject.height === 'tall') {
            filterObject.height = { $lte: 70, $gte: 40 }
        } else {
            filterObject.height = { $gte: 70 }
        }
}

if ('weight' in filterObject){
    if (filterObject.weight === 's') {
        filterObject.weight = { $lte: 5 }
    } else if (filterObject.weight === 'm') {
        filterObject.weight = { $lte: 10, $gte: 5 }
    } else if (filterObject.weight === 'l') {
        filterObject.weight = { $lte: 20, $gte: 10 }
    } else {
        filterObject.weight = { $gte: 20 }
    }
}

    if (filterObject.name) {
        filterObject.name = {
            $regex: filterObject.name,
            $options: 'i'
        }
    }
    req.body = filterObject
    next()
}

async function typesBeforeAdd(req, res, next) {
    req.body.height = Number(req.body.height)
    req.body.weight = Number(req.body.weight)
    next()
}

module.exports = { queries, typesBeforeAdd }