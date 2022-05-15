import { Navigate } from "react-router-dom";

import ArtistDetailsPage from "./ArtistDetailsPage";
import EventDetailsPage from "./EventDetailsPage";
import SearchPage from "./SearchPage";

const routes = () => {
  return [
    {
      path: "/",
      element: <SearchPage />,
    },
    {
      path: "/event/:id",
      element: <EventDetailsPage />,
    },
    {
      path: "/artist/:id",
      element: <ArtistDetailsPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
  ];
};

export default routes;
