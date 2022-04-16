import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./SnakeyChart.css";
import { withTranslation } from "react-i18next";
import { store } from "../../configure-store";

/** Mock api response at first time from JSON */
const SankeyChart = (props) => {
  useEffect(() => {
    async function getData() {
      await fetch("./data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          myJson !== undefined && store.dispatch({ type: "getData", myJson });
        });
      setTabelDdata(store.getState().data.data);
    }
    getData();
  }, []);

  /** state to handle this component */
  const { t } = props;
  const [selectedName, setSelectedName] = useState("Electricity Bill");
  const [name, setName] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const [tabelData, setTabelDdata] = useState(store.getState().data);
  const [names, setNames] = useState([]);
  const [insource, setInsource] = useState([]);
  const [income, setIncome] = useState("");
  const [addFor, setAddFor] = useState("");

  /**update dropdown list as per table data update */
  useEffect(() => {
    if (tabelData.length > 1) {
      var t = tabelData.map((x) => x[1]);
      var u = tabelData.map((x) => x[0]);
      setNames(t);
      setInsource([...new Set(u)]);
    }
  }, [tabelData, name, income]);

  //Add new entry
  const addParam = () => {
    if (name !== "" && addAmount !== "") {
      var t = [addFor, name, parseInt(addAmount)];
      setName("");
      setAddAmount(undefined);
      store.dispatch({ type: "saveData", t });
      setTabelDdata(store.getState().data.data);
    }
  };

  //delete existing entry
  const deleteParam = () => {
    if (selectedName) {
      store.dispatch({ type: "deleteData", t: { name: selectedName } });
      setAddAmount("");
      setEditAmount("");
      setTabelDdata(store.getState().data.data);
    }
  };

  //edit existing entry
  const editEntry = () => {
    if (selectedName) {
      store.dispatch({
        type: "editData",
        t: { name: selectedName, amount: editAmount },
      });
      setEditAmount("");
      selectedName("");
      setTabelDdata(store.getState().data.data);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAddAmountChange = (e) => {
    setAddAmount(e.target.value);
  };
  const handleEditAmountChange = (e) => {
    setEditAmount(e.target.value);
  };

  const selectName = (e) => {
    setSelectedName(e.target.value);
  };
  const handleIncome = (e) => {
    setIncome(e.target.value);
  };
  const addIncome = () => {
    store.dispatch({
      type: "addIncome",
      t: [income.toString(), `saving_${insource.length}`, income],
    });
    setTabelDdata(store.getState().data.data);
  };
  const selectIncome = (event) => {
    setAddFor(event.target.value);
  };
  return (
    <div className="container mt-5">
      <table className="tablePi">
        <tbody>
          <tr>
            <th>{t("addin")}</th>
            <th>{t("add")}</th>
            <th>{t("edit")}</th>
            <th>{t("delete")}</th>
          </tr>
          <tr>
            <td>
              <label>{t("addin")}</label>
              <input type="text" onChange={(e) => handleIncome(e)} />
              <button onClick={() => addIncome()}>{t("addin")}</button>
            </td>
            <td>
              <label>{t("name")}</label>
              <select
                onChange={(e) => {
                  selectIncome(e);
                }}
              >
                {insource.map((e, key) => {
                  return (
                    key !== 0 && (
                      <option key={key} value={e}>
                        {e}
                      </option>
                    )
                  );
                })}
              </select>
              <label>{t("name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  handleNameChange(e);
                }}
              />

              <td>
                <label>{t("amount")}</label>
                <input
                  type="text"
                  value={addAmount}
                  onChange={(e) => {
                    handleAddAmountChange(e);
                  }}
                />{" "}
              </td>
              <td>
                <button id="addP" onClick={() => addParam()}>
                  {t("add")}
                </button>
              </td>
            </td>
            <td>
              <tr>
                <label>{t("name")}</label>
                <select
                  onChange={(e) => {
                    selectName(e);
                  }}
                >
                  {names.map((e, key) => {
                    return (
                      key !== 0 && (
                        <option key={key} value={e}>
                          {e}
                        </option>
                      )
                    );
                  })}
                </select>
              </tr>
              <tr>
                <td>
                  <label>{t("amount")}</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      handleEditAmountChange(e);
                    }}
                  />{" "}
                </td>
              </tr>
              <tr>
                <button onClick={() => editEntry()}>{t("edit")}</button>
              </tr>
            </td>
            <td>
              <tr>
                <td>
                  <label>{t("name")}</label>
                  <select
                    onChange={(e) => {
                      selectName(e);
                    }}
                  >
                    {names.map((e, key) => {
                      return (
                        key !== 0 && (
                          <option key={key} value={e}>
                            {e}
                          </option>
                        )
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <button
                  onClick={() => {
                    deleteParam();
                  }}
                >
                  {t("delete")}
                </button>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Sankey Chart</h2>
      <div className="chart">
        <Chart
          width={700}
          height={"350px"}
          chartType="Sankey"
          loader={<div>{t("loading")}</div>}
          data={tabelData}
          rootProps={{ "data-testid": "1" }}
        />
      </div>
    </div>
  );
};

export default withTranslation()(SankeyChart);
