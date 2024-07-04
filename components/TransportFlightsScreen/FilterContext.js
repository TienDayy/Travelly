import React, { createContext, useState } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filterDepartureTime, setFilterDepartureTime] = useState(null);
  const [filterArrivalTime, setFilterArrivalTime] = useState(null);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(1500);
  const [filterSortOption, setFilterSortOption] = useState('Departure time');

  return (
    <FilterContext.Provider value={{ filterDepartureTime, setFilterDepartureTime,
                                     filterArrivalTime, setFilterArrivalTime,
                                     filterMinPrice, setFilterMinPrice,
                                     filterMaxPrice, setFilterMaxPrice,
                                     filterSortOption, setFilterSortOption }}>
      {children}
    </FilterContext.Provider>
  );
};
