const paginatedResults = async (model, req, findBy, sorts) => {
    const results = {}
    const page = parseInt(req.query.page) || 1
    if(page < 1) page = 1
    const limit = parseInt(req.query.limit) || 5
    if(limit < 1) limit = 5

    let startIndex = (page-1) * limit
    let endIndex = startIndex + limit

    try{
        let size = await model.find({...findBy}).sort({...sorts}).countDocuments().exec()
        results.totalCount = size
        if(size > limit){
            if(startIndex <= 0){
                results.next = {
                    page: page + 1,
                    limit
                }
            }
            if(endIndex >= size){
                if(startIndex <= size){
                    results.prev = {
                        page: Math.ceil(size / limit) - 1,
                        limit
                    }
                }
            }
            if(endIndex < (size - 2) && startIndex > 0){
                results.prev = {
                    page: page-1,
                    limit
                }
                results.next = {
                    page: page+1,
                    limit
                }
            }
            results.current = await model.find({...findBy}).sort({...sorts}).limit(limit).skip(startIndex).exec()
        }
        else{
            results.current = await model.find({...findBy}).sort({...sorts}).exec()
        }
        return {error: false, data: results}
    }
    catch(err){
        return {error: true, message: err}
    }
}


module.exports = {paginatedResults}