import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useLoading from "../../utils/hooks/useLoading";
import ApiManager from "../../api/ApiManager";

import "./SummaryDetails.css";

const SummaryDetails = () => {
  const { summaryId } = useParams();

  const location = useLocation();

  const { loading, withLoading } = useLoading();

  //state
  const [history, setHistory] = useState<UserSummaryHistory>();

  useEffect(() => {
    fetchHistoryById();
  }, []);

  const fetchHistoryById = () => {
    if (!summaryId) return;
    withLoading(async () => {
      const response = await ApiManager.getHistoryById(summaryId);
      setHistory(response.history.history[0]);
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container">
      <div className="summaryDetailsContent">
        <div className="summaryDetailsTitleContainer">
          <span className="summaryDetailsTitle">{history?.title}</span>
          <span className="summaryDetailsDate">
            {history && formatDate(history?.date)}
          </span>
        </div>
        <div className="summaryDetailsText">
          <p>{history?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetails;
