module.exports = async(modelo, query)=>{
    let resultado = Object();
    let skip = query.skip || 0;
    let limit = query.limit || 10;
    let result = Object();
    if (!query.where) {
		query = {
			where: query
		};
    }
    console.log("***********", query)
    let count = query.where;
    query.populate ? 
    resultado = await modelo.find(query.where).populate(query.populate).paginate(skip, limit) : 
    resultado = await modelo.find(query.where).paginate(skip, limit) ;
    
    result.data = resultado;
    resultado = await modelo.count(count);
    result.count = resultado;
    return result;
};