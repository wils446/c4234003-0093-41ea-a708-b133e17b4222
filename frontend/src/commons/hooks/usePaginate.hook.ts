import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useQueryString } from "./useQueryString.hook";
import { PAGE_QUERY_KEY } from "../constant";

export const usePaginate = (totalData: number, dataPerPage: number) => {
	const searchParams = useSearchParams();
	const { updateQueryUrl } = useQueryString();
	const page = useMemo(() => +(searchParams.get("page") || 1), [searchParams]);

	const totalPage = useMemo(() => {
		if (totalData % dataPerPage === 0) return totalData / dataPerPage;
		else return Math.floor(totalData / dataPerPage) + 1;
	}, [dataPerPage, totalData]);

	const setPage = useCallback(
		(page: number) => {
			if (page > totalPage || page <= 0) return;

			updateQueryUrl([PAGE_QUERY_KEY, "" + page]);
		},
		[totalPage, updateQueryUrl]
	);

	const nextPage = useCallback(() => setPage(page + 1), [setPage, page]);
	const prevPage = useCallback(() => setPage(page - 1), [setPage, page]);

	return { page, totalPage, setPage, nextPage, prevPage };
};
