import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Bubbles = ({ logos }) => {
  const ref = useRef(null);

  const getRadius = () => {
    if (window.innerWidth < 1024) return 28;
    return 35;
  };

  const getSize = (radius) => `${radius * 2 * 0.9}px`;

  useEffect(() => {
    if (!ref?.current) return;

    const container = d3.select(ref.current);
    const box = container.node().getBoundingClientRect();
    const { width } = box;
    const height = 355;
    let radius = getRadius();
    const nodes = d3.range(logos.length).map((d) => ({
      radius,
      src: logos[d],
    }));

    const root = nodes[0];
    root.radius = 0;
    root.fixed = true;

    container.style("position", "relative");

    container
      .selectAll(".image")
      .data(nodes.slice(1))
      .enter()
      .append("div")
      .attr("class", "image")
      .style("height", (d) => getSize(radius))
      .style("width", (d) => getSize(radius))
      .style("border-radius", "100%")
      .style("background-image", (d) => `url(${d.src})`)
      .style("background-size", "cover")
      .style("background-position", "center center")
      .style("background-repeat", "no-repeat")
      .style("transform", "translate(-50%, -50%)")
      .style("position", "absolute");

    const force = d3.layout
      .force()
      .gravity(0.075)
      .charge((d, i) => (i ? 0 : -900))
      .nodes(nodes)
      .size([width, height - 20]);

    force.start();

    const tick = () => {
      const q = d3.geom.quadtree(nodes);
      let i = 0;
      const n = nodes.length;
      while (++i < n) q.visit(collide(nodes[i]));
      container
        .selectAll(".image")
        .style("left", (d) => `${d.x}px`)
        .style("top", (d) => `${d.y}px`);
    };

    force.on("tick", tick);

    // eslint-disable-next-line func-names
    container.on("mousemove", () => {
      const [px, py] = d3.mouse(container.node());
      root.px = px;
      root.py = py;
      force.resume();
    });

    const collide = (node) => {
      const r = node.radius * 1.5;
      const nx1 = node.x - r;
      const nx2 = node.x + r;
      const ny1 = node.y - r;
      const ny2 = node.y + r;
      return (quad, x1, y1, x2, y2) => {
        if (quad.point && quad.point !== node) {
          let x = node.x - quad.point.x;
          let y = node.y - quad.point.y;
          let l = Math.sqrt(x * x + y * y);
          const rr = node.radius + quad.point.radius;
          if (l < rr) {
            l = ((l - rr) / l) * 0.5;
            x *= l;
            y *= l;
            node.x -= x;
            node.y -= y;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    };

    window.addEventListener("resize", () => {
      radius = getRadius();
      nodes.forEach((d) => {
        d.radius = radius;
      });
      container
        .selectAll(".image")
        .style("height", (d) => getSize(radius))
        .style("width", (d) => getSize(radius));
      force.resume();
    });
  }, [logos]);

  return <div className="h-full" ref={ref} />;
};

export default Bubbles;
