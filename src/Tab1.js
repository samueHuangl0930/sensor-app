import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { Select, DatePicker, Space, message } from "antd";
import moment from "moment";
import { fetchPlantData } from "./API";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Tab1 = () => {
  const [selectedId, setSelectedId] = useState("1"); //  預設ID為 "1"
  const [dateRange, setDateRange] = useState([]); // 日期範圍
  const [chartData, setChartData] = useState({ temperature: [], humidity: [], light: [] }); // 搜尋結果資料

  const categories = [
    { id: "1", name: "黃金葛" },
    { id: "2", name: "仙人掌" },
    { id: "3", name: "蘆薈" },
    { id: "4", name: "多肉" },
  ];

  //ID 選擇
  const handleIdChange = (value) => {
    setSelectedId(value);
  };

  //日期範圍選擇
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  // 監聽selectedId 或 dateRange 
  useEffect(() => {
    if (!selectedId) {
      return; // 如果 ID 為空，不请求
    }

    const fetchData = async () => {
      const startDate = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : "";
      const endDate = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : startDate;

      try {
        const response = await fetchPlantData(selectedId, startDate, endDate);
        const { success, data } = response;

        if (success) {
          const temperatures = [];
          const humidities = [];
          const lights = [];
          const dates = [];

          // 把資料塞到圖表格式
          data.forEach((item) => {
            const date = moment(item.created_at).format("YYYY-MM-DD"); // 使用紀錄時間作為日期
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
  }, [selectedId, dateRange]); // 監聽 selectedId 和 dateRange 变化

  // 圖表選項
  const option1 = {
    title: {
      text: "温度",
      left: "center",
      top: "top",
    },
    xAxis: {
      type: "category",
      data: chartData.temperature.dates, 
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 40,
      axisLabel: {
        formatter: "{value} °C",
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
      },
    ],
  };

  const option2 = {
    title: {
      text: "濕度",
      left: "center",
      top: "top",
    },
    xAxis: {
      type: "category",
      data: chartData.humidity.dates, 
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        formatter: "{value} %",
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
      },
    ],
  };

  const option3 = {
    title: {
      text: "光度",
      left: "center",
      top: "top",
    },
    xAxis: {
      type: "category",
      data: chartData.light.dates, 
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1000,
      axisLabel: {
        formatter: "{value} cd/m²",
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
      },
    ],
  };

  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
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
      <ReactECharts option={option1} style={{ height: 400 }} />
      <ReactECharts option={option2} style={{ height: 400 }} />
      <ReactECharts option={option3} style={{ height: 400 }} />
    </div>
  );
};

export default Tab1;
