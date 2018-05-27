'use strict';

exports.respond= function(promise,res){	
	promise
	.then((data) => {
		console.log(data);
		res.send(data)

	})
	.catch((err) => {
		console.log('err',err)
		res.status(501);
		res.send(err)
  });
}

