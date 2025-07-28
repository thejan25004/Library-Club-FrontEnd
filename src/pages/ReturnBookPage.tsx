import React from "react";
import { useLibrary } from "../context/useLibrary.ts";
import { returnBook } from "../api/lendingService.ts";
import Navbar from "../component/Navbar.tsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../utils/showToast.ts";

const ReturnBookPage = () => {
    const navigate = useNavigate();
    const { lendings } = useLibrary();
    const [selectedId, setSelectedId] = React.useState('');
    const selectedLending = lendings.find(l => l._id === selectedId && !l.isReturned);

    const handleReturn = async () => {
        if (!selectedId) return;

        try {
            await returnBook(selectedId);
            toast.success("⌛ Book returned successfully!");
            setSelectedId('');
            navigate("/dashboard");
        } catch (error) {
            showError(error);
        }
    };

    const notReturnedLendings = lendings.filter(l => !l.isReturned);

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-red-950 to-black px-4">
            <Navbar />
            <div className="max-w-4xl mx-auto py-10">
                <div className="bg-gray-900 border border-red-500 p-6 sm:p-8 rounded-2xl shadow-lg transition hover:scale-[1.02] hover:border-red-400 duration-300 mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-red-400">
                        ⏳ Return a Book
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">
                                Select a Book to Return
                            </label>
                            <select
                                value={selectedId}
                                onChange={(e) => setSelectedId(e.target.value)}
                                className="w-full px-4 py-3 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition placeholder:text-gray-400"
                            >
                                <option value="" disabled>-- Choose a Book --</option>
                                {notReturnedLendings.map(lending => (
                                    <option key={lending._id} value={lending._id}>
                                        {lending.book.title} — {lending.reader.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedLending && (
                            <div className="bg-gray-800 border border-red-500 p-5 sm:p-6 rounded-xl shadow-md transition hover:shadow-lg hover:border-red-400">
                                <h3 className="text-lg sm:text-xl font-semibold text-red-400 mb-3">Return Details</h3>
                                <ul className="text-sm sm:text-base text-white space-y-1">
                                    <li><strong>📘 Book:</strong> {selectedLending.book.title}</li>
                                    <li><strong>🙋 Reader:</strong> {selectedLending.reader.fullName}</li>
                                    <li><strong>📅 Due Date:</strong> {new Date(selectedLending.dueDate).toDateString()}</li>
                                </ul>
                                <button
                                    onClick={handleReturn}
                                    className="w-full mt-5 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium text-base sm:text-lg"
                                >
                                    Confirm Return
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnBookPage;