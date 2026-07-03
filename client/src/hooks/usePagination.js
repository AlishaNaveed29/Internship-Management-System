import { useState, useCallback } from "react";

export function usePagination(fetchFn, initialPage = 1, initialLimit = 10) {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const limit = initialLimit;

  const fetchWithPagination = useCallback(async (...args) => {
    const res = await fetchFn(...args);
    setTotal(res.data.total || 0);
    setPages(res.data.pages || 1);
    return res;
  }, [fetchFn]);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return { page, total, pages, limit, setPage, goToPage, resetPage, fetchWithPagination };
}
