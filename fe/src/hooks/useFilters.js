import { useState, useMemo } from "react";

export const useFilters = (initialFilters = {}) => {
  const [filterUI, setFilterUI] = useState(initialFilters);
  const [appliedFilter, setAppliedFilter] = useState({});

  const setFilter = (key, value) => {
    setFilterUI((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filterUI).filter(([_, v]) => v !== ""),
    );

    setAppliedFilter(activeFilters);
  };

  const resetFilters = () => {
    setFilterUI(initialFilters);
    setAppliedFilter({});
  };

  const removeFilter = (key) => {
    setAppliedFilter((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    setFilterUI((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  // untuk API / URL
  const serializedFilters = useMemo(() => {
    return Object.entries(appliedFilter)
      .map(([k, v]) => `${k},${v}`)
      .join(";");
  }, [appliedFilter]);

  return {
    filterUI,
    appliedFilter,
    setFilter,
    applyFilters,
    resetFilters,
    removeFilter,
    serializedFilters,
  };
};
