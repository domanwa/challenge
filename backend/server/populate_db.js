require('mysql-import').config({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'personnel',
	onerror: err=>console.log(err.message)
}).import('backend.sql').then(()=> {
	console.log('all statements have been executed')
});
