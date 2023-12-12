import React from "react";
import "./List.css";
import ClipLoader from "react-spinners/ClipLoader";

type ListProps = {
  loading: boolean;
  data: any[] | null;
  renderItem: (item: any) => JSX.Element;
};

const List = ({ data, renderItem, loading }: ListProps) => {
  if (loading) {
    return <ClipLoader size={99} className="spinner" color="#36d7b7" />;
  }

  if (data === null || data === undefined) {
    return null;
  }

  return (
    <div className="scrollableList">
      {data?.map((item: any) => renderItem(item))}
    </div>
  );
};

export default List;
