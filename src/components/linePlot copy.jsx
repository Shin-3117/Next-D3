"use client";

import * as d3 from "d3";
import {
  useEffect,
  useRef,
} from "react";

export default function StackedBarChart({}) {
  const ref = useRef();

  useEffect(() => {
    // set up

    const margin = {
      top: 20,
      right: 10,
      bottom: 20,
      left: 40,
    };

    const width =
      300 - margin.left - margin.right;
    const height =
      100 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr(
        "width",
        width +
          margin.left +
          margin.right
      )
      .attr(
        "height",
        height +
          margin.top +
          margin.bottom
      )
      .append("g")
      .attr(
        "transform",
        `translate(${margin.left},${margin.top})`
      );

    // data

    const data = [
      {
        month: "Jan",
        apples: 3840,
        bananas: 1920,
        cherries: 960,
        dates: 400,
      },
      {
        month: "Feb",
        apples: 1600,
        bananas: 1440,
        cherries: 960,
        dates: 400,
        a: 100,
      },
      {
        month: "March",
        apples: 640,
        bananas: 960,
        cherries: 640,
        dates: 400,
      },
      {
        month: "Apr",
        apples: 3120,
        bananas: 1480,
        cherries: 640,
        dates: 400,
      },
    ];

    const fruit = Object.keys(
      data[0]
    ).filter((d) => d != "month");
    const months = data.map(
      (d) => d.month
    );

    const stackedData = d3
      .stack()
      .keys(fruit)(data);

    const xMax = d3.max(
      stackedData[
        stackedData.length - 1
      ],
      (d) => d[1]
    );

    // scales

    const x = d3
      .scaleLinear()
      .domain([0, xMax])
      .nice()
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(months)
      .range([0, height])
      .padding(0.25);

    const color = d3
      .scaleOrdinal()
      .domain(fruit)
      .range(d3.schemeTableau10);

    // axes

    const xAxis = d3
      .axisTop(x)
      .ticks(5, "~s");
    const yAxis = d3.axisLeft(y);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${0})`
      )
      .call(xAxis)
      .call((g) =>
        g.select(".domain").remove()
      );

    svg
      .append("g")
      .call(yAxis)
      .call((g) =>
        g.select(".domain").remove()
      );

    // draw bars

    // create one group for each fruit
    const layers = svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) =>
        color(d.key)
      );

    // transition for bars
    const duration = 1000;
    const t = d3
      .transition()
      .duration(duration)
      .ease(d3.easeLinear);

    layers.each(function (_, i) {
      // this refers to the group for a given fruit
      d3.select(this)
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) =>
          y(d.data.month)
        )
        .attr("height", y.bandwidth())
        .transition(t)
        // i is the index of this fruit.
        // this will give the bars for each fruit a different delay
        // so that the fruits will be revealed one at a time.
        // using .each() instead of a normal data join is needed
        // so that we have access to what fruit each bar belongs to.
        .delay(i * duration)
        .attr(
          "width",
          (d) => x(d[1]) - x(d[0])
        );
    });
  }, []);

  return <svg ref={ref} />;
}
