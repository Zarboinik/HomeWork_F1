import useAxios from "axios-hooks";

interface UseApiProps {
    url?: string;
    method?: string;
    manual?: boolean;
}

export default function useApi({url, method = "GET", manual = false}: UseApiProps) {

    const [{data, loading}, fetch] = useAxios(
        {url, method},
        {
            useCache: false,
            manual: manual || typeof window === `undefined`,
        },
    );

    return [
        data,
        fetch,
        loading,
    ];
}
