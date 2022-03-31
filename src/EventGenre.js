import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      const genres = ["React", "JavaScript", "Node.js", "jQuery", "AngularJS"];

      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.split(" ").includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  const COLORS = ["#BE83DA", "#6DDEFF", "#F1D548", "#FA8562", "#B9EB80"];

  return (
    <ResponsiveContainer height={400}>
      <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <text
          x="50%"
          y={20}
          fill="#FBCA57"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="30">Events by Category</tspan>
        </text>
        <Pie
          data={data}
          cx={"50%"}
          cy={200}
          labelLine={false}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
