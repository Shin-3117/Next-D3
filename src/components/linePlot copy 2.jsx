"use client";

import React, {
  useEffect,
  useRef,
} from "react";
import * as d3 from "d3";

const StackedBarChartH = ({}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    //data
    const states = [
      "AL",
      "AK",
      "AZ",
      "AR",
    ]; // 4가지 state로 가정

    const generateRandomPopulation =
      () =>
        Math.floor(
          Math.random() * 1000000
        ); // 랜덤 인구 수 생성 함수

    const data = [];

    states.forEach((state) => {
      const ageCategories = [
        "<10",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "≥80",
      ];
      ageCategories.forEach((age) => {
        data.push({
          state,
          age,
          population:
            generateRandomPopulation(),
        });
      });
    });

    const width = 928;
    const marginTop = 30;
    const marginRight = 10;
    const marginBottom = 0;
    const marginLeft = 30;

    const series = d3
      .stack()
      .keys(
        d3.union(data.map((d) => d.age))
      )
      .value(
        ([, D], key) =>
          D.get(key).population
      )(
      d3.index(
        data,
        (d) => d.state,
        (d) => d.age
      )
    );

    const height =
      series[0].length * 25 +
      marginTop +
      marginBottom;
    //x 축
    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(series, (d) =>
          d3.max(d, (d) => d[1])
        ),
      ])
      .range([
        marginLeft,
        width - marginRight,
      ]);
    //y 축
    const y = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          (D) =>
            -d3.sum(
              D,
              (d) => d.population
            ),
          (d) => d.state
        )
      )
      .range([
        marginTop,
        height - marginBottom,
      ])
      .padding(0.08);

    const color = d3
      .scaleOrdinal()
      .domain(series.map((d) => d.key))
      .range(
        d3.schemeSpectral[series.length]
      )
      .unknown("#ccc");

    const formatValue = (x) =>
      isNaN(x)
        ? "N/A"
        : x.toLocaleString("en");

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [
        0,
        0,
        width,
        height,
      ])
      .attr(
        "style",
        "max-width: 100%; height: auto;"
      );

    svg.selectAll("*").remove();

    svg
      .append("g")
      .selectAll()
      .data(series)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((D) =>
        D.map(
          (d) => ((d.key = D.key), d)
        )
      )
      .join("rect")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(d.data[0]))
      .attr("height", y.bandwidth())
      .attr(
        "width",
        (d) => x(d[1]) - x(d[0])
      )
      .append("title")
      .text(
        (d) =>
          `${d.data[0]} ${
            d.key
          }\n${formatValue(
            d.data[1].get(d.key)
              .population
          )}`
      );

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${marginTop})`
      )
      .call(
        d3
          .axisTop(x)
          .ticks(width / 100, "s")
      )
      .call((g) =>
        g.selectAll(".domain").remove()
      );

    svg
      .append("g")
      .attr(
        "transform",
        `translate(${marginLeft},0)`
      )
      .call(
        d3.axisLeft(y).tickSizeOuter(0)
      )
      .call((g) =>
        g.selectAll(".domain").remove()
      );
  }, []);

  return <svg ref={svgRef} />;
};

export default StackedBarChartH;
