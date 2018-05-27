'use strict';

exports.respond= function(data,res){	
		console.log(data);
		res.send(data)
}

exports.error= function(err,res){	
		res.status(501);
		res.send(err)
  }

