import * as React from "react";
import { useState, useEffect, useDeferredValue, useMemo } from "react";

import styled from "styled-components";
import Header from "../../components/Header";

import EventCard from "../../components/EventCard";
import useSkiddleAPI from "../../utils/skiddle/useSkiddleAPI";
import useDebounce from "../../hooks/useDebounce";

import { SearchResultDataObject } from "../../types";

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword);

  // Search path defined by selected keyword
  const searchPath = useMemo(
    () =>
      debouncedKeyword
        ? `/events/search/?api_key=${
            import.meta.env.VITE_SKIDDLE_API_KEY
          }&keyword=${debouncedKeyword}`
        : null,
    [debouncedKeyword]
  );
  const { data, error, isLoading } = useSkiddleAPI(searchPath);

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <Header />
      <SearchContainer>
        <h2>Search Events</h2>
        <SearchBox
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
          placeholder={"e.g party"}
        />
      </SearchContainer>
      {!error ? (
        <EventsList
          isLoading={isLoading}
          data={data}
          keyword={debouncedKeyword}
        />
      ) : (
        <span>{"An error occurred"}</span>
      )}
    </div>
  );
};

export default SearchPage;

const EventsList: React.FC<{
  data?: SearchResultDataObject;
  isLoading: boolean;
  keyword: string;
}> = ({ data, isLoading, keyword }) => {
  // Caching logic
  const [cache, setCache] = useState<SearchResultDataObject | null>(null);
  useEffect(() => {
    if (data) {
      if (data.results.length) {
        // valid result = cache
        setCache(data);
      } else {
        // invalid result = clear cache
        setCache(null);
      }
    }
    // no keyword = clear cache
    if (!keyword) {
      setCache(null);
    }
  }, [data]);

  if (keyword) {
    if (!cache) {
      return (
        <MetaText>
          <span>
            {isLoading ? "Loading..." : "No events with this keyword"}
          </span>
        </MetaText>
      );
    }

    if (cache) {
      return (
        <EventsListContainer isLoading={isLoading}>
          {cache.results.map((result) => (
            <EventCard
              searchResult={result}
              key={result.uniquelistingidentifier}
            />
          ))}
        </EventsListContainer>
      );
    }
  }

  return (
    <MetaText>
      <span>Enter a keyword to search for events</span>
    </MetaText>
  );
};

const MetaText = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
  align-items: center;
  padding: 2rem;
  > span {
    text-align: center;
    color: var(--color-dark-gray);
  }
`;

const SearchContainer = styled.div`
  padding: 1rem;
  background-color: var(--color-skiddle-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 100vw;
  position: sticky;
  top: 0;
  z-index: 100;
  > h2 {
    text-align: center;
    font-size: 18px;
    color: white;
  }
`;

const EventsListContainer = styled.div<any>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  max-width: 1200px;
  margin: auto;
  opacity: ${(props) => (props.isLoading ? "0.5" : "1")};
`;

const SearchBox = styled.input`
  padding: 0.75rem 1.5rem;
  font-size: 18px;
  font-weight: 300;
  border: none;
  border-radius: var(--border-radius-1);
  text-align: center;
  box-shadow: var(--box-shadow-1);
`;
