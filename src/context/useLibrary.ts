import {useContext} from "react";
import {LibraryContext} from "./LibraryContext.ts";

export const useLibrary = () => {
    const context = useContext(LibraryContext);

    if (!context) {
        throw new Error("useLibrary must be used within a LibraryProvider");
    }

    return context;
}