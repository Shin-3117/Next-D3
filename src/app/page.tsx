import LinePlot from "./../components/linePlot";
import StackedBarChart from "./../components/linePlot copy";
import StackedBarChartH from "./../components/linePlot copy 2";

export default function Home() {
  const data = [10, 20, 30, 80];
  const StackedBarChartData = [
    {
      state: "AL",
      age: "<10",
      population: 598478,
    },
    {
      state: "AB",
      age: "<10",
      population: 123456,
    },
    {
      state: "AL",
      age: "10-19",
      population: 638789,
    },
    {
      state: "AB",
      age: "10-19",
      population: 223456,
    },
  ];
  return (
    <main className="m-2">
      <h1>메인 페이지</h1>
      {/* <LinePlot data={data} /> */}
      <StackedBarChart />
      <StackedBarChartH></StackedBarChartH>
    </main>
  );
}
