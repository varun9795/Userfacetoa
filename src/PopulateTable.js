import React from "react";
import { Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const BASE_URL =
  "https://datausa.io/api/data?drilldowns=State&measures=Population";

export default function PopulateTable() {
  const [data_rows, setdata_rows] = useState([[]]);
  const [uniqueFilters, setuniqueFilters] = useState([]);
  const [uniqueFiltersYear, setuniqueFiltersYear] = useState([]);

  const cols = [
    {
      title: "ID State",
      dataIndex: "ID State",
    },
    {
      title: "Population",
      dataIndex: "Population",
    },
    {
      title: "Slug State",
      dataIndex: "Slug State",
    },
    {
      title: "State",
      dataIndex: "State",
      filters: uniqueFilters,
      filterSearch: true,
      onFilter: (value, record) => record.State.indexOf(value) === 0,
    },
    {
      title: "Year",
      dataIndex: "Year",
      filters: uniqueFiltersYear,
      filterSearch: true,
      onFilter: (value, record) => record.Year.indexOf(value) === 0,
    },
  ];

  const getData = async (URL) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(`${URL}`, config);
      let set_State = new Set();
      data.data.map((val) => {
        set_State.add(val["State"]);
      });

      let states = [...set_State];

      setdata_rows(data.data);
      let filters = [];
      states.map((s) => {
        filters.push({
          text: s,
          value: s,
        });
      });
      setuniqueFilters(filters);

      let set_year = new Set();
      data.data.map((val) => {
        set_year.add(val["Year"]);
      });

      let years = [...set_year];

      let filtersyear = [];
      years.map((y) => {
        filtersyear.push({
          text: y,
          value: y,
        });
      });
      setuniqueFiltersYear(filtersyear);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const location = useLocation();
  useEffect(() => {
    let queryparams = queryString.parse(location.search);

    let URL = BASE_URL;

    if (queryparams.year != null) URL = URL + "&year=" + queryparams.year;
    getData(URL);
  }, []);

  return <Table columns={cols} dataSource={data_rows} />;
}
