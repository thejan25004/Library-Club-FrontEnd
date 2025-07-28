import { useState } from "react";
// import { useLibrary } from "../context/useLibrary.ts";
import {useLibrary} from "../../context/useLibrary.ts";
// import Navbar from "../component/Navbar.tsx";

const AuditLogPage = () => {
    const { auditLogs: logs } = useLibrary();
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filteredLogs = logs.filter((log) => {
        const query = searchTerm.toLowerCase();
        const actionMatch = log.action.toLowerCase().includes(query);
        const detailMatch = log.details.toLowerCase().includes(query);

        const logDate = new Date(log.timestamp);
        const isAfterFrom = fromDate ? logDate >= new Date(fromDate) : true;
        const isBeforeTo = toDate ? logDate <= new Date(toDate) : true;

        return (actionMatch || detailMatch) && isAfterFrom && isBeforeTo;
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-red-950 to-black px-4">
            {/*<Navbar />*/}
            <div className="max-w-7xl mx-auto py-6 sm:py-10">
                <div className="bg-gray-900 border border-red-500 p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-red-400 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-red-400">
                        📜 Audit Log History
                    </h2>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 justify-center">
                        <input
                            type="text"
                            placeholder="Search by action or details..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 px-4 py-2 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition placeholder:text-gray-400 placeholder:italic"
                        />
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full sm:w-48 px-4 py-2 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full sm:w-48 px-4 py-2 border border-red-500 rounded-lg text-white bg-gray-800 outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>

                    <div className="overflow-x-auto rounded-2xl">
                        <table className="min-w-full bg-gray-900">
                            <thead>
                            <tr className="bg-gradient-to-r from-red-600 via-red-700 to-black text-white">
                                <th className="p-4 text-left rounded-tl-2xl">Action</th>
                                <th className="p-4 text-left">Details</th>
                                <th className="p-4 text-left rounded-tr-2xl">Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredLogs.length > 0 ? (
                                filteredLogs.map((log) => (
                                    <tr
                                        key={log._id}
                                        className="border-t border-red-500 hover:bg-gray-800 transition text-white"
                                    >
                                        <td className="p-4">{log.action}</td>
                                        <td className="p-4">{log.details}</td>
                                        <td className="p-4">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center text-white">
                                        No audit logs found.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditLogPage;