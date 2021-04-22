const { addBook, showAllBooks, showBookById, updateBookById, deleteBookById } = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook,
	},
	{
		method: 'GET',
		path: '/books',
		handler: showAllBooks,
	},
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: showBookById,
	},
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: updateBookById,
	},
	{
		method: 'DELETE',
		path: '/books/{bookId}',
		handler: deleteBookById,
	}
];

module.exports = routes;