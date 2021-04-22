const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (req, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
	const id = nanoid(16);
	const finished = (pageCount === readPage) ? true : false;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
	};

	if (!name) return h.response({
		status: 'fail',
		message: 'Gagal menambahkan buku. Mohon isi nama buku'
	}).code(400);

	if (readPage > pageCount) return h.response({
		status: 'fail',
		message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
	}).code(400);

	books.push(newBook);

	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) return h.response({
		status: 'success',
		message: 'Buku berhasil ditambahkan',
		data: {
			bookId: id,
		},
	}).code(201);
	
	return h.response({
		status: 'error',
		message: 'Buku gagal ditambahkan'
	}).code(500);
}

const showAllBooks = (req, h) => {
	const { name, reading, finished } = req.query;

	if (name !== undefined) {
		return h.response({
			status: 'success',
			data: {
				books: books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()))
				.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		}).code(200);
	} else if (reading == 1) {
		return h.response({
			status: 'success',
			data: {
				books: books.filter((book) => book.reading === true)
				.map(book => ({
					id: book.id,	
					name: book.name,
					publisher: book.publisher,
				})),
			}
		}).code(200);		
	} else if (reading == 0) {
		return h.response({
			status: 'success',
			data: {
				books: books.filter((book) => book.reading === false)
				.map(book => ({
					id: book.id,	
					name: book.name,
					publisher: book.publisher,
				})),
			}
		}).code(200);	
	} else if (finished == 1) {
		return h.response({
			status: 'success',
			data: {
				books: books.filter((book) => book.finished === true)
				.map(book => ({
					id: book.id,	
					name: book.name,
					publisher: book.publisher,
				})),
			}
		}).code(200);
	} else if (finished == 0) {
		return h.response({
			status: 'success',
			data: {
				books: books.filter((book) => book.finished === false)
				.map(book => ({
					id: book.id,	
					name: book.name,
					publisher: book.publisher,
				})),
			}
		}).code(200);
	}

	return h.response({
		status: 'success',
		data: {
			books: books.map(book => ({
				id: book.id,	
				name: book.name,
				publisher: book.publisher,
			})),
		}
	}).code(200);
};

const showBookById = (req, h) => {
	const { bookId } = req.params;
	const book = books.filter((b) => b.id === bookId)[0];
	
	if (book !== undefined) return h.response({
		status: 'success',
		data: {
			book,
		},
	}).code(200);

	return h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan'
	}).code(404);
};

const updateBookById = (req, h) => {
	const { bookId } = req.params;
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
	const finished = (pageCount === readPage) ? true : false;
	const updatedAt = new Date().toISOString();

	if (!name) return h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Mohon isi nama buku',
	}).code(400);

	if (readPage > pageCount) return h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
	}).code(400);

	const index = books.findIndex((book) => book.id === bookId);

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};

		return h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		}).code(200);
	}

	return h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	}).code(404);
};

const deleteBookById = (req, h) => {
	const { bookId } = req.params;
	const index = books.findIndex((book) => book.id === bookId);

	if (index != -1) {
		books.splice(index, 1);
		return h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		}).code(200);
	}

	return h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan'
	}).code(404);
};

module.exports = { addBook, showAllBooks, showBookById, updateBookById, deleteBookById };

