 import React, { createContext, useContext, useState, useCallback } from 'react';
//
// interface SearchContextType {
//     searchValue: string;
//     setSearchValue: (value: string) => void;
//     searchResults: any[];
//     setSearchResults: (results: any[]) => void;
//     handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     handleClearSearch: () => void;
//     handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
// }
//
// const SearchContext = createContext<SearchContextType | undefined>(undefined);
//
// export const useSearchContext = (): SearchContextType => {
//     const context = useContext(SearchContext);
//     if (!context) {
//         throw new Error('useSearchContext must be used within a SearchProvider');
//     }
//     return context;
// };
//
// export const SearchProvider: React.FC = ({ children }) => {
//     const [searchValue, setSearchValue] = useState('');
//     const [searchResults, setSearchResults] = useState<any[]>([]);
//
//     const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchValue(event.target.value);
//         if (event.target.value.trim()) {
//             // Здесь можно добавить вызов API для поиска
//             // Пример: dispatch(fetchMangaByTitle(event.target.value));
//         } else {
//             setSearchResults([]);
//         }
//     }, []);
//
//     const handleClearSearch = useCallback(() => {
//         setSearchValue('');
//         setSearchResults([]);
//     }, []);
//
//     const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             // Здесь логика для перехода на страницу с результатами поиска
//             // Пример: navigate(`/search?q=${searchValue}`);
//         }
//     }, [searchValue]);
//
//     return (
//         <SearchContext.Provider value={{
//             searchValue,
//             setSearchValue,
//             searchResults,
//             setSearchResults,
//             handleSearchChange,
//             handleClearSearch,
//             handleKeyDown
//         }}>
//             {children}
//         </SearchContext.Provider>
//     );
// };
