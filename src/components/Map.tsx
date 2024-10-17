import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Papa from 'papaparse';
import * as d3 from 'd3';

const Tooltip: React.FC<{ content: string; x: number; y: number }> = ({
  content,
  x,
  y,
}) => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: y + 10,
        left: x + 10,
        backgroundColor: "white",
        border: "1px solid black",
        padding: "5px",
        zIndex: 1000,
        pointerEvents: "none",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />,
    document.body
  );
};


const Map = () => {

  const { data: results, isLoading } = useQuery<Results>({
    queryKey: ['results'],
    queryFn: async () => {
      const res = await fetch('./data/results.csv')
      const text = await res.text()
      return Papa.parse(text, { header: true }).data as Results
    }
  })

  const { data: latlng } = useQuery({
    queryKey: ['latlng'],
    queryFn: async () => {
      const res = await fetch('./data/latlng.csv')
      const text = await res.text()
      return Papa.parse(text, { header: true }).data as LatLng
    }
  })

  const svgRef = useRef<SVGSVGElement>(null)

  // useEffect(() => {
  //   if (results && latlng) {
  //     const svg = d3.select(svgRef.current)
  //     const g = svg.append('g')
  //     const projection = d3.geoMercator().center([-96, 37.8])
  //     const path = d3.geoPath().projection(projection)

  //     svg.selectAll('path')
  //       .data(results)
  //       .enter()
  //       .append('path')
  //       .attr('d', path)
  //   }
  // }, [results, latlng])


  console.log(results, latlng)

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <svg ref={svgRef}></svg>
      )}
    </div>
  );
};

export default Map;
