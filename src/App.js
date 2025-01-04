import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import Flower from "./flower";
import { Select, DatePicker, Space, message } from "antd";
import moment from "moment";
import { fetchSelected, fetchPlant, fetchPlantData } from "./API";

const { Option } = Select;
const { RangePicker } = DatePicker;

const App = () => {
  const [selectedId, setSelectedId] = useState(""); // 預設ID為 "1"
  const [dateRange, setDateRange] = useState([]); // 日期範圍
  const [plantData, setPlantData] = useState([]); // 存放fetchPlant的結果
  const [chartData, setChartData] = useState({
    temperature: { dates: [], values: [] },
    humidity: { dates: [], values: [] },
    light: { dates: [], values: [] },
  }); // 搜尋結果資料
  const [categories, setCategories] = useState([]);

  //ID 選擇
  const handleIdChange = (value) => {
    setSelectedId(value);
  };

  //日期範圍選擇
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchSelected();
        console.log(response);
        console.log(response.length);
        if (response && response.length > 0) {
          setCategories(response);
          setSelectedId(response[0].id);
        } else {
          message.error("無法獲取類別資料666！");
        }
      } catch (error) {
        message.error("類別資料加載失敗！");
      }
    };

    fetchCategories();
  }, []);
  // 獲取植物基本數據
  useEffect(() => {
    if (!selectedId) return;

    const fetchPlantInfo = async () => {
      try {
        const response = await fetchPlant(selectedId);

        if (response) {
          setPlantData(response.rules);
        } else {
          message.error("無法獲取植物資料！");
        }
      } catch (error) {
        message.error("植物資料加載失敗！");
      }
    };

    fetchPlantInfo();
  }, [selectedId]);

  // 監聽selectedId 或 dateRange
  useEffect(() => {
    if (!selectedId) return;

    const fetchData = async () => {
      const startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : "";
      const endDate = dateRange[1]
        ? dateRange[1].format("YYYY-MM-DD")
        : startDate;

      try {
        const response = await fetchPlantData(selectedId, startDate, endDate);
        if (response) {
          const temperatures = [];
          const humidities = [];
          const lights = [];
          const dates = [];

          response.forEach((item) => {
            const date = moment(item.created_at).format("YYYY-MM-DD");
            dates.push(date);
            temperatures.push(item.temperature);
            humidities.push(item.humidity);
            lights.push(item.light);
          });

          setChartData({
            temperature: { dates, values: temperatures },
            humidity: { dates, values: humidities },
            light: { dates, values: lights },
          });
        } else {
          message.error("資料加載失敗！");
        }
      } catch (error) {
        message.error("無法獲取數據！");
      }
    };

    fetchData();
  }, [selectedId, dateRange]); // 監聽 selectedId 和 dateRange 變化
  // 圖表選項
  const option1 = {
    title: {
      text: "温度",
      left: "center",
      top: "top",
      textStyle: {
        color: "#a7ffee",
      },
    },
    xAxis: {
      type: "category",
      data: chartData.temperature.dates,
      axisLabel: {
        color: "#a7ffee",
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 40,
      axisLabel: {
        formatter: "{value} °C",
        color: "#a7ffee",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const data = params[0];
        return `${data.axisValue}<br/>温度: ${data.data} °C`;
      },
    },
    series: [
      {
        data: chartData.temperature.values,
        type: "line",
        lineStyle: {
          color: "#39c6d6",
        },
        itemStyle: {
          color: "#6bf0ff",
        },
      },
    ],
  };

  const option2 = {
    title: {
      text: "濕度",
      left: "center",
      top: "top",
      textStyle: {
        color: "#a7ffee",
      },
    },
    xAxis: {
      type: "category",
      data: chartData.humidity.dates,
      axisLabel: {
        color: "#a7ffee",
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        formatter: "{value} %",
        color: "#a7ffee",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const data = params[0];
        return `${data.axisValue}<br/>濕度: ${data.data} %`;
      },
    },
    series: [
      {
        data: chartData.humidity.values,
        type: "line",
        lineStyle: {
          color: "#39c6d6",
        },
        itemStyle: {
          color: "#6bf0ff",
        },
      },
    ],
  };

  const option3 = {
    title: {
      text: "光度",
      left: "center",
      top: "top",
      textStyle: {
        color: "#a7ffee",
      },
    },
    xAxis: {
      type: "category",
      data: chartData.light.dates,
      axisLabel: {
        color: "#a7ffee",
      },
    },
    yAxis: {
      type: "value",
      min: 2000,
      max: 10000,
      axisLabel: {
        formatter: "{value} cd/m²",
        color: "#a7ffee",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const data = params[0];
        return `${data.axisValue}<br/>光照: ${data.data} cd/m²`;
      },
    },
    series: [
      {
        data: chartData.light.values,
        type: "line",
        lineStyle: {
          color: "#39c6d6",
        },
        itemStyle: {
          color: "#6bf0ff",
        },
      },
    ],
  };

  return (
    <div className="root">
      <Flower />
      <div className="content">
        <Space style={{ marginTop: 15 }}>
          <Select
            placeholder="選擇類別"
            style={{ width: 150 }}
            value={selectedId}
            onChange={handleIdChange}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <RangePicker onChange={handleDateChange} />
        </Space>
        <table border="1" style={{ marginBottom: 20, width: "100%" }}>
          <thead>
            <tr>
              <th>類型</th>
              <th>溫度範圍 (°C)</th>
              <th>濕度範圍 (%)</th>
              <th>亮度範圍 (cd/m²)</th>
            </tr>
          </thead>
          <tbody>
            {plantData.map((rule, index) => (
              <tr key={index}>
                <td>{rule.type_name}</td>
                <td>
                  {rule.temperature_min} - {rule.temperature_max}
                </td>
                <td>
                  {rule.humidity_min} - {rule.humidity_max}
                </td>
                <td>
                  {rule.light_min} - {rule.light_max}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="chart">
          <ReactECharts option={option1} style={{ height: 400 }} />
          <ReactECharts option={option2} style={{ height: 400 }} />
          <ReactECharts option={option3} style={{ height: 400 }} />
        </div>
      </div>
    </div>
  );
};

export default App;
