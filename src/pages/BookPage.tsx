import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { createBook, deleteBook, updateBook } from "../api/bookService.ts";
import { useLibrary } from "../context/useLibrary.ts";
import type { Book } from "../types/Book.ts";
import { toast } from "react-toastify";
import { showError } from "../utils/showToast.ts";
import BookForm from "../component/forms/BookForm.tsx";
import BookTable from "../component/tables/BookTable.tsx";

const BookPage: React.FC = () => {
    const { books, fetchBooks } = useLibrary();

    const [form, setForm] = useState<Book>({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        available: true
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateBook(editingId, form);
                toast.success("📘 Book updated successfully");
            } else {
                await createBook(form);
                toast.success("📗 Book added successfully");
            }
            setForm({ title: '', author: '', genre: '', isbn: '', available: true });
            setEditingId(null);
            fetchBooks();
        } catch (error) {
            showError(error);
        }
    };

    const handleEdit = (book: Book) => {
        setForm(book);
        setEditingId(book._id || null);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBook(id);
            toast.success("🗑️ Book deleted successfully");
            fetchBooks();
        } catch (err) {
            showError(err);
        }
    };

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-red-950 to-black px-4">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Book Form Section */}
                    <div className="bg-gray-900   p-6 rounded-2xl shadow-lg hover:scale-[1.02] hover:border-red-400 lg:w-1/3 w-full">
                        <h2 className="text-2xl font-semibold text-red-400 mb-4 text-center">📚 Manage Books</h2>
                        <BookForm
                            form={form}
                            editingId={editingId}
                            handleInput={handleInput}
                            handleSubmit={handleSubmit}
                        />
                    </div>

                    {/* Book Table Section */}
                    <div className="w-full bg-gray-900   p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.02] hover:border-red-400">
                        <BookTable
                            books={filteredBooks}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
