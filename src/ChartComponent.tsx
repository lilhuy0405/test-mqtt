import {createChart, CrosshairMode} from "lightweight-charts";
import {useEffect, useRef} from "react";

export const ChartComponent = ({data}: any) => {


  const chartContainerRef = useRef<any>();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({width: chartContainerRef?.current?.clientWidth});
      };

      const chart = createChart(chartContainerRef.current, {
        width: 1700,
        height: 800,
        layout: {
          background: {

            // type: 'solid',
            color: '#000000',
          },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },
        timeScale: {
          borderColor: 'rgba(197, 203, 206, 0.8)',
        },

      });
      const candleSeries = chart.addCandlestickSeries({
        upColor: 'rgba(255, 144, 0, 1)',
        downColor: '#000',
        borderDownColor: 'rgba(255, 144, 0, 1)',
        borderUpColor: 'rgba(255, 144, 0, 1)',
        wickDownColor: 'rgba(255, 144, 0, 1)',
        wickUpColor: 'rgba(255, 144, 0, 1)',
      });

      candleSeries.setData(data);
      // let lastBar = data[data.length - 1];

      // setInterval(() => {
      //   const newTime = moment(lastBar.time).add(1, 'days').valueOf();
      //   const newBar = {
      //     time: newTime,
      //     open: lastBar.close,
      //     high: lastBar.close + Math.random(),
      //     low: lastBar.close - Math.random(),
      //     close: lastBar.close + Math.random(),
      //   };
      //   lastBar = newBar;
      //   console.log("newBar", newBar)
      //   candleSeries.update(newBar);
      //
      // }, 1000);


      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    },
    [data]
  );

  return (
    <div
      ref={chartContainerRef}
    />
  );
};
