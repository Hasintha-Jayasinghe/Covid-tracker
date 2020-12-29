import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card/Card";
import { JSONInput } from "./types";
import { Line, Bar } from "react-chartjs-2";

function App() {
  const [json, setJSON] = useState<JSONInput>();
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const fetchJSON = async () => {
      const localCases: number[] = [];
      const localDates: string[] = [];

      const fetchedData = await fetch(
        "https://hpb.health.gov.lk/api/get-current-statistical"
      );
      const json = (await fetchedData.json()) as JSONInput;
      json.data.daily_pcr_testing_data.map((d) => {
        localCases.push(d.count);
        localDates.push(d.date);
        return true;
      });

      setChartData({
        labels: localDates,
        datasets: [
          {
            label: "Positive PCR Tests",
            data: localCases,
            backgroundColor: "rgba(255, 0, 0, 0.6)",
          },
        ],
      });

      if (json) {
        setJSON(json);
      } else {
        fetchJSON();
      }
    };

    fetchJSON();
  }, []);

  return (
    <div className="app">
      <h1>Covid tracker</h1>
      <div className="cards-wrapper">
        <div className="data-cards">
          <Card
            color="red"
            data={String(json?.data.local_deaths)}
            label="Local Deaths"
          />
          <Card
            color="orange"
            data={String(json?.data.global_deaths)}
            label="Global Deaths"
          />
          <Card
            color="teal"
            data={String(json?.data.local_new_cases)}
            label="Local cases (new)"
          />
          <Card
            color="dodgerblue"
            data={String(json?.data.global_new_cases)}
            label="Global cases (new)"
          />
        </div>
      </div>
      <div className="charts">
        <div className="chart-1">
          <Line
            height={450}
            options={{ maintainAspectRatio: false }}
            width={450}
            data={chartData}
          />
        </div>
        <div className="chart-2">
          <Bar
            height={450}
            width={450}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: ["Global"],
              datasets: [
                {
                  label: "Global Cases",
                  data: [json?.data.global_total_cases],
                  backgroundColor: "dodgerblue",
                },
                {
                  label: "Global Deaths",
                  data: [json?.data.global_deaths],
                  backgroundColor: "teal",
                },
              ],
            }}
          />
        </div>
        <div className="chart-3">
          <Bar
            height={450}
            width={450}
            options={{ maintainAspectRatio: false }}
            data={{
              labels: ["Local"],
              datasets: [
                {
                  label: "Local Cases",
                  data: [json?.data.local_total_cases],
                  backgroundColor: "dodgerblue",
                },
                {
                  label: "Local Deaths",
                  data: [json?.data.local_deaths],
                  backgroundColor: "teal",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
