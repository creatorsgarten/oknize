import { useCallback, useState } from 'react';

export default function useSearch<T>(data: T[], searchFn: (data: T[]) => T[]) {
    const [filteredData, setFilteredData] = useState<T[]>(data);

    const handleSearch = useCallback(
        (query: string) => {
            const filteredData = searchFn(data);
            setFilteredData(filteredData);
        },
        [data, searchFn]
    );

    return { filteredData, handleSearch };
}
