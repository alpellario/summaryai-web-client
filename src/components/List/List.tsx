import React from "react";
import "./List.css";  

type ListProps = {
  loading: boolean;
  data: any | null;
  renderItem: (item: any) => JSX.Element;
};

const List = ({ data, renderItem, loading }: ListProps) => {
  if (!data || loading) {
    return <div>Loading...</div>;
  } else if (data.length === 0) {
    return <div>No data</div>;
  }
  return <div className="scrollableList">{data.map((item: any) => renderItem(item))}</div>;
};

export default List;
