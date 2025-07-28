import React from "react";
import type { Book } from "../../types/Book.ts";

interface BookTableProps {
    books: Book[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleEdit: (book: Book) => void;
    handleDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
                                                 books,
                                                 searchTerm,
                                                 setSearchTerm,
                                                 handleEdit,
                                                 handleDelete,
                                             }) => {
    return (
        <div className="relative bg-gray-900 border border-red-500 p-6 md:p-8 rounded-2xl shadow-lg transition-all hover:scale-[1.02] hover:border-red-400 duration-300 w-full mb-6">
            <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 placeholder:text-gray-400 mb-6"
            />

            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full bg-gray-900 rounded-2xl text-left text-sm md:text-base">
                    <thead>
                    <tr className="bg-gradient-to-r from-red-600 via-red-700 to-black text-white">
                        <th className="p-4">Title</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Genre</th>
                        <th className="p-4">ISBN</th>
                        <th className="p-4">Available</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr
                            key={book._id}
                            className="border-t border-red-500 hover:bg-gray-800 transition duration-200 text-white"
                        >
                            <td className="p-4">{book.title}</td>
                            <td className="p-4">{book.author}</td>
                            <td className="p-4">{book.genre}</td>
                            <td className="p-4">{book.isbn}</td>
                            <td className="p-4">{book.available ? "✅ Yes" : "❌ No"}</td>
                            <td className="p-4">
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 font-semibold transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book._id || "")}
                                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 font-semibold transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {books.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-4 text-center text-white">
                                No books found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookTable;
