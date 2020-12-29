import React from "react";
import "./Card.css";

interface Props {
  color: string;
  label: string;
  data: string;
}

const Card: React.FC<Props> = ({ color, label, data }) => {
  return (
    <div className="card" style={{ borderColor: color }}>
      <label htmlFor={`${label}-id`}>{label}</label>
      <div className="card-inner-data">
        <h4 style={{ color: color }} id={`${label}-id`}>
          {data}
        </h4>
      </div>
    </div>
  );
};

export default Card;
