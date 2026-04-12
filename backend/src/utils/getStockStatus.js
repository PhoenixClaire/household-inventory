//helper for getting the status of each item in the inventory [in stock, low stock, out of stock]

function getStockStatus(quantity, threshold){
    if(quantity === 0){
        return "Out of Stock";
    }

    if(quantity <= threshold){
        return "Low Stock";
    }

    return "In Stock";
}

module.exports = getStockStatus; //export the function