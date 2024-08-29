import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

const Dashboard = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [activeIndex, setActiveIndex] = useState(0);
  const [Users, setUsers] = useState([]);
  const [Tours, setTours] = useState([]);
  const [Bookings, setBookings] = useState([]);
  const [Monthlyuser, setMonthlyuser] = useState([]);
  const [Piedata, setPiedata] = useState([]);
  //   const [bardata, setBardata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const usersResponse = await axios.get(`${BASE_URL}/admin/users/`);
        const plansResponse = await axios.get(`${BASE_URL}/admin/plans/`);
        const piedataResponse = await axios.get(`${BASE_URL}/admin/pichart/`);
        const bookingsResponse = await axios.get(`${BASE_URL}/admin/tickets/`);
        const monthlyuserResponse = await axios.get(
          `${BASE_URL}/admin/monthly/`
        );

        console.log("Users Data:", usersResponse.data);
        console.log("Plans Data:", plansResponse.data);
        console.log("Bookings Data:", bookingsResponse.data);
        console.log("Monthlyuser Data:", monthlyuserResponse.data);
        console.log("PiedataResponse Data:", piedataResponse.data);

        setUsers(usersResponse.data.data || []);
        setTours(plansResponse.data.data || []);
        setBookings(bookingsResponse.data.data || []);
        setMonthlyuser(monthlyuserResponse.data.data || []);
        setPiedata(piedataResponse.data.data || []);
        // setBardata(monthlyuserResponse.data.data );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);
  console.log("Pichart", Piedata);
  const bardata = [
    { name: "Jan", users: 0 },
    { name: "Feb", users: 0 },
    { name: "Mar", users: 0 },
    { name: "Apr", users: 0 },
    { name: "May", users: 0 },
    { name: "Jun", users: 0 },
    { name: "Jul", users: 0 },
    { name: "Aug", users: 0 },
    { name: "Sep", users: 0 },
    { name: "Oct", users: 0 },
    { name: "Nov", users: 0 },
    { name: "Dec", users: 0 },
  ];

  Monthlyuser.forEach((user) => {
    const monthData = bardata.find((data) => data.name === user.name);
    if (monthData) {
      monthData.users = user.userCount;
    }
  });

  console.log(bardata);

  const piedata = [];

  Piedata.forEach((item) => {
    piedata.push({
      name: item.name.en,
      value: item.value,
    });
  });
  console.log("piedata", piedata);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Tickets ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="flex items-center mt-10 gap-5 flex-wrap">
        <div className="bg-stone-200 pl-8 pr-20 flex flex-col justify-start py-3 rounded-xl">
          <p className="leading-loose">
            Total users <br />
            <span className="font-bold text-xl">{Users.length}</span>
          </p>
        </div>
        <div className="bg-stone-200 pl-8 pr-20 flex flex-col justify-start py-3 rounded-xl">
          <p className="leading-loose">
            Total tours <br />
            <span className="font-bold text-xl">{Tours.length}</span>
          </p>
        </div>
        <div className="bg-stone-200 pl-8 pr-20 flex flex-col justify-start py-3 rounded-xl">
          <p className="leading-loose">
            Total bookings <br />
            <span className="font-bold text-xl">{Bookings.length}</span>
          </p>
        </div>
        <div className="bg-stone-200 pl-8 pr-20 flex flex-col justify-start py-3 rounded-xl">
          <p className="leading-loose">
            Active tickets <br />
            <span className="font-bold text-xl">{Bookings.length}</span>
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold my-10">User Activity by Month</h1>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={bardata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="users"
                fill="#F2C300"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-10">
            Ticket Booking Distribution
          </h1>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={piedata}
                  cx="50%"
                  cy="50%"
                  innerRadius={160}
                  outerRadius={200}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {piedata.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
