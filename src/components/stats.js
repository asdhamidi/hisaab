import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axiosInstance from "./api-handling";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = ({ title, chartsScreen, setChartsScreen, month, entries }) => {
  const [dataPoints, setDataPoints] = useState([]);

  const choiceChange = (choice) => {
    choice = Number(choice);

    if (choice === 1) {
      axiosInstance
        .get("/stats/daily/" + month)
        .then((response) => {
          let new_data = response.data;
          new_data = renameKeyInJson(new_data, "_id", "x");
          new_data.forEach((entry) => {
            entry.x = parseDateString(entry.x);
          });
          new_data = renameKeyInJson(new_data, "total_price", "y");
          let options = {
            title: {
              text: "spending over month",
            },
            axisX: {
              title: "days->",
            },
            axisY: {
              title: "spending",
            },
            data: [
              {
                type: "column",
                dataPoints: new_data,
              },
            ],
          };
          setOptions(options);
        })
        .catch((error) => {
          console.error("Error fetching daily stats:", error);
        });
    } else {
      axiosInstance
        .get("/stats/daily_person/" + month)
        .then((response) => {
          let new_data = response.data;
          new_data = renameKeyInJson(new_data, "_id", "label");
          new_data = renameKeyInJson(new_data, "total_price", "y");
          let options = {
            title: {
              text: "spending by person",
            },
            axisX: {
              title: "",
            },
            axisY: {
              title: "spending",
            },
            data: [
              {
                type: "bar",
                dataPoints: new_data,
              },
            ],
          };
          setOptions(options);

          setDataPoints(new_data);
        })
        .catch((error) => {
          console.error("Error fetching daily stats:", error);
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/stats/daily/" + month)
      .then((response) => {
        let new_data = response.data;
        new_data = renameKeyInJson(new_data, "_id", "x");
        new_data.forEach((entry) => {
          entry.x = parseDateString(entry.x);
        });
        new_data = renameKeyInJson(new_data, "total_price", "y");
        setOptions({
          title: {
            text: "spending over month",
          },
          axisX: {
            title: "days->",
          },
          axisY: {
            title: "spending",
          },
          data: [
            {
              type: "column",
              dataPoints: new_data,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching daily stats:", error);
      });
  }, [setDataPoints]);

  function renameKeyInJson(obj, oldKeyName, newKeyName) {
    if (Array.isArray(obj)) {
      // If the object is an array, apply the function to each element
      return obj.map((item) => renameKeyInJson(item, oldKeyName, newKeyName));
    } else if (typeof obj === "object" && obj !== null) {
      const newObj = {};

      // Iterate through each key in the object
      Object.keys(obj).forEach((key) => {
        if (key === oldKeyName) {
          newObj[newKeyName] = renameKeyInJson(
            obj[key],
            oldKeyName,
            newKeyName
          );
        } else {
          newObj[key] = renameKeyInJson(obj[key], oldKeyName, newKeyName);
        }
      });

      return newObj;
    } else {
      // If the value is neither an array nor an object, return it as is
      return obj;
    }
  }

  function parseDateString(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);

    const fullYear = 2000 + year; // Assumes 2000-2049 range for two-digit years

    return day;
  }

  const [options, setOptions] = useState({
    title: {
      text: "Combined Expenses", // Use prop value or default if not provided
    },
    axisX: {
      valueFormatString: "##/" + (new Date().getMonth() + 1),
    },
    axisY: {
      title: "expenses",
      prefix: "₹",
    },
    data: [
      {
        yValueFormatString: "###",
        type: "line",
        dataPoints: dataPoints,
      },
    ],
  });

  return (
    <div className="pop pop-active">
      <div style={{ width: "100%" }} className="chart-container">
        <div className="owe-controls charts-owe-controls">
          <h2>stats</h2>
          <hr style={{ width: "100%" }}></hr>
        </div>
        <select
          className="month"
          name="month"
          id="month"
          onChange={(event) => {
            choiceChange(event.target.value);
          }}
        >
          <option value="1">combined expense</option>
          <option value="2">person wise</option>
        </select>
        <CanvasJSChart options={options} />
        <div style={{ marginTop: "2rem", fontSize: "1.5rem" }}>
          total spending:
          <b> ₹{entries.reduce((sum, item) => sum + Number(item.price), 0)}</b>
        </div>
      </div>

      <h1
        className="close"
        onClick={() => {
          setChartsScreen(!chartsScreen);
        }}
      >
        close
      </h1>
    </div>
  );
};

export default Chart;
