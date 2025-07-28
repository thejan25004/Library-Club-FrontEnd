import React, {useEffect} from 'react';
import Navbar from '../component/Navbar';
import {useLibrary} from "../context/useLibrary.ts";
import AuditLogTable from "../component/tables/AuditLogTable.tsx";

const Dashboard: React.FC = () => {
    const {fetchBooks, fetchReaders, fetchLendings, fetchAuditLogs, books, readers, lendings} = useLibrary();
    const lentOutBooks = lendings.filter((l) => !l.isReturned); // assuming `returned: boolean`

    useEffect(() => {
        fetchReaders();
        fetchBooks();
        fetchLendings();
        fetchAuditLogs();
    }, []);

    return (
        <div className="h-full w-full bg-gradient-to-br from-red-950 to-black">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Header Card */}
                <div className="p-0 shadow-xl mb-8 transform transition duration-300 hover:scale-[1.02]">
                    <img
                        src="https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg"
                        alt="Book Club Banner"
                        className="w-full h-[300px] object-cover rounded-xl"
                    />

                    {/*<h1 className="text-3xl font-bold text-center text-black mt-4">*/}
                    {/*    Welcome to Our Book Club*/}
                    {/*</h1>*/}
                </div>


                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-black border border-red-500 p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:border-red-400">
                        <h2 className="text-xl font-semibold text-red-400 mb-1">📚 Total Books</h2>
                        <p className="text-white text-lg">{books.length}</p>
                    </div>
                    <div className="bg-black border  border-red-500 p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:border-red-400">
                        <h2 className="text-xl font-semibold text-red-400 mb-1">👥 Registered Readers</h2>
                        <p className="text-white text-lg">{readers.length}</p>
                    </div>
                    <div className="bg-black border  border-red-500 p-6 rounded-2xl shadow-lg transition-transform hover:scale-105 hover:border-red-400">
                        <h2 className="text-xl font-semibold text-red-400 mb-1">⏳ Books Lent Out</h2>
                        <p className="text-white text-lg">{lentOutBooks.length}</p>
                    </div>
                </div>

                {/* Audit Logs Table */}
                <div className="mt-10">
                    <AuditLogTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;