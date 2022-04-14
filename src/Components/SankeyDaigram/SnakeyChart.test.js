import SankeyChart from "./SnakeyChart";
import { mount, shallow } from "enzyme";
import nock from "nock";
import React from "react";
import { store } from "../../configure-store";

nock("http://localhost:3000/data.json")
  .persist()
  .get("")
  .reply(200, {
    data: {
      data: [
        ["From", "To", "Weight"],
        ["5000", "Electricity Bill", 1000],
        ["5000", "Mobile Bill", 2000],
      ],
    },
  });

describe("Sankey Chart", () => {
  it("Should have table class named tablePi", () => {
    const viewer = shallow(<SankeyChart />);
    expect(viewer.html()).toMatch("tablePi");
  });

  it("Should have Sankey Chart title", () => {
    const viewer = shallow(<SankeyChart />);
    expect(viewer.html()).toMatch("Sankey Chart");
  });
  it("perform button click on addparam", () => {
    // const FakeFun = jest.spyOn(SankeyChart.prototype, "addParam");
    const logSpy = jest.spyOn(console, "log");
    const viewer = mount(<SankeyChart />);
    console.log(viewer.html());
    const hh = viewer.find("button").at(0);
    hh.simulate("click");
    viewer.update();
    expect(logSpy).toHaveBeenCalled();
  });
  it("getData should have data", () => {
    store.dispatch({ type: "getData", myJson: [["as", 200]] });
    const t = store.getState().data;
    expect(t).toHaveLength(1);
  });
});
