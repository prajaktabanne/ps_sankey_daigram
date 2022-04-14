import { connect } from "react-redux";
import SankeyChart from "./SnakeyChart";

const mapStateToPros = (state) => {
  return {
    state,
  };
};

export const Container = connect(mapStateToPros)(SankeyChart);
