import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import SummaryLayout from "../../components/SummaryLayout";
import { SkiddleArtist } from "../../types";

import useSkiddleAPI from "../../utils/skiddle/useSkiddleAPI";

const ArtistDetailsPage = () => {
  const { id } = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: SkiddleArtist; error: any; isLoading: boolean } = useSkiddleAPI(
    `/artist/${id}/?api_key=${import.meta.env.VITE_SKIDDLE_API_KEY}`
  );

  if (data && data.results) {
    return (
      <SummaryLayout
        title={data.results.name}
        subtitle={"Artist"}
        heroImage={data.results.imageurl}
        main={<div>Description and summary go here</div>}
        side={<div>Artist stats etc.</div>}
      />
    );
  } else {
    return <span>Todo</span>;
  }
};

export default ArtistDetailsPage;
