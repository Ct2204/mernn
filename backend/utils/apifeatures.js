class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        } : {}

        console.log(keyword)

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        // Removing  some fields for category
        const removeFields = ['keyword', 'page', 'limit']
        
        removeFields.forEach(key => delete queryCopy[key])

        // Filter for price and Rating

        // console.log(queryCopy)

        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
          

        this.query = this.query.find(JSON.parse(queryStr))

       // console.log(queryStr)
        return this;
    }

    pagination(resultPerpage) {
        const curentPage = Number(this.queryStr.page) || 1     //50-10

        const skip = resultPerpage * (curentPage - 1)
        
        this.query = this.query.limit(resultPerpage).skip(skip)

        return this;
        
    }


}

module.exports = ApiFeatures