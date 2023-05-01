// **********************************************
// **********************************************
// Helper functions

export function getRID(req:any) {
	return '#' + req.params.id;
}

export function getRelationQuery(rid:any, relation:any) {
	return 'SELECT EXPAND( OUT("' + relation + '") ) ' +
	 	   'FROM User WHERE @rid=' + rid;
} 

export function createRelation(req:any, type:any) {
	return req.graphDB.create('EDGE', type)
	.from(getRID(req))
	.to('#' + req.params.other_user_id)
	.one();
}

// Any  relation that exists between a  A and a
//  B is deleted. The reason a Promise is used is because
// only after the pre-existing relations are deleted should a new
// relation be created. 
export function destroyRelations(req:any,relations:string[]) {
    let tab:any[] = [];
    relations.forEach(relation => {
        tab.push(destroyRelation(req, relation))
    });
	return Promise.all(tab);
}

export function destroyRelation(req:any, type:any) {
	return req.graphDB.delete('EDGE', type)
				.from(getRID(req))
				.to('#' + req.params.other_user_id)
				.scalar()
}