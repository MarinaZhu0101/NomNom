import React, { createContext, useState, useCallback, useContext } from 'react';
import { RestaurantContext } from './RestaurantContext';
import { SingleRestaurantContext } from './SingleRestaurantContext';

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
const [searchQuery, setSearchQuery] = useState();

const { restaurant } = useContext(RestaurantContext);
// console.log(restaurant);

return (
<SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
{children}
</SearchContext.Provider>
)
}