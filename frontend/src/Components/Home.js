import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import "./Home.css";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Normalize API month strings to index 0–11 */
function monthIndex(month) {
  if (!month || typeof month !== "string") return -1;
  const m = month.trim();
  const full = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const short = MONTH_LABELS.map((s) => s.toLowerCase());
  const lower = m.toLowerCase();
  let i = full.indexOf(lower);
  if (i >= 0) return i;
  i = short.indexOf(lower.slice(0, 3));
  return i;
}

function buildMonthlySeries(rows) {
  const rain = Array(12).fill(null);
  const avgMin = Array(12).fill(null);
  const absMax = Array(12).fill(null);

  rows.forEach((row) => {
    const i = monthIndex(row.month);
    if (i < 0) return;
    const r = parseFloat(row.avgdailyrain);
    const lo = parseFloat(row.avgmin);
    const hi = parseFloat(row.absmax);
    rain[i] = Number.isFinite(r) ? r : null;
    avgMin[i] = Number.isFinite(lo) ? lo : null;
    absMax[i] = Number.isFinite(hi) ? hi : null;
  });

  return { rain, avgMin, absMax };
}

export default function Home() {
  const raw = useSelector((state) => state.averageState.mnthlyAvrgs[0]);
  const rows = Array.isArray(raw) ? raw : [];
  const hasData = rows.length > 0;

  const chartOptions = useMemo(() => {
    const { rain, avgMin, absMax } = buildMonthlySeries(rows);

    return {
      chart: {
        type: "line",
        backgroundColor: "#ffffff",
        style: { fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' },
      },
      title: {
        text: "Climate by month",
        align: "left",
        margin: 16,
        style: { fontSize: "1.1rem", fontWeight: "600" },
      },
      subtitle: {
        text:
          "Average daily rainfall (mm) vs. typical low and record high temperatures (°F). " +
          "Rain uses the right axis; temperatures use the left.",
        align: "left",
        style: { fontSize: "0.8rem", color: "#555" },
      },
      credits: { enabled: false },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        itemStyle: { fontSize: "12px" },
      },
      tooltip: {
        shared: true,
        valueDecimals: 1,
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat:
          '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
      },
      xAxis: {
        categories: MONTH_LABELS,
        lineColor: "#ccc",
        tickLength: 0,
        labels: { style: { fontSize: "11px" } },
      },
      yAxis: [
        {
          title: {
            text: "Temperature (°F)",
            style: { fontSize: "12px", color: "#374151" },
          },
          labels: { format: "{value}°", style: { fontSize: "11px" } },
          gridLineColor: "#e8e8e8",
        },
        {
          title: {
            text: "Rainfall (mm)",
            style: { fontSize: "12px", color: "#374151" },
          },
          opposite: true,
          labels: { format: "{value}", style: { fontSize: "11px" } },
          gridLineWidth: 0,
        },
      ],
      series: [
        {
          name: "Avg. daily rainfall",
          type: "column",
          yAxis: 1,
          data: rain,
          color: "#3b82f6",
          borderWidth: 0,
          tooltip: { valueSuffix: " mm" },
        },
        {
          name: "Avg. low temperature",
          type: "line",
          yAxis: 0,
          data: avgMin,
          color: "#0d9488",
          lineWidth: 2,
          marker: { radius: 3 },
          tooltip: { valueSuffix: " °F" },
        },
        {
          name: "Record high (absolute max)",
          type: "line",
          yAxis: 0,
          data: absMax,
          color: "#ea580c",
          lineWidth: 2,
          dashStyle: "ShortDot",
          marker: { radius: 3 },
          tooltip: { valueSuffix: " °F" },
        },
      ],
      plotOptions: {
        series: { connectNulls: false },
        column: { borderRadius: 2, groupPadding: 0.08 },
      },
    };
  }, [rows]);

  return (
    <div className="home">
      <h1 className="home__title">Monthly climate snapshot</h1>
      <p className="home__lede">
        Year-round averages from your saved data: how much rain typically falls each day,
        the usual overnight low, and the hottest temperature on record for that month.
      </p>

      <div className="home__panel">
        <p className="home__note">
          <strong>How to read this:</strong> blue bars are rain (scale on the right). Green and
          orange lines are temperatures in °F (scale on the left)—green is a typical low; orange is
          a record high.
        </p>
        {!hasData ? (
          <p className="home__empty">
            No monthly averages loaded yet. Add rows to the <code>averages</code> table (or seed
            the API) and refresh—this chart will fill in automatically.
          </p>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
