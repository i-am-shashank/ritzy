import React, { useEffect, useState } from "react";

import ItemList from "../components/ItemList";
import Loading from "../components/Loading";
import NoResults from "../components/NoResults";
import { useLocation } from "react-router-dom";

export default function Result() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchResult = location?.state?.data;

  useEffect(() => {
    setData(searchResult);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data.length) {
    return <NoResults />;
  }

  return <ItemList data={data} />;
}
