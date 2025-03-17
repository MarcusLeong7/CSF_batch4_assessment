db.products.find()

db.products.distinct('Category', { Category: { $nin: [ '', null ] } })


db.products.find(
    { Category: { $regex: category, $options: 'i' } } // Case-insensitive regex match for Category
)
.limit(count) // Limits the result to 'count' number of documents
.sort({ DiscountPrice: -1 }) // Sorts results by DiscountPrice in descending order
