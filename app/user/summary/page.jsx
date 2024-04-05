import { getShiftsByUserId, getUserWagesByUserId, getWorkedShiftsByUserId, getWorkTimeByUserId } from "@/utils/db";
import { getSession } from "@/utils/session";
import { LineChart } from "./charts/LineChart";
import { BarChart } from "./charts/BarChart";
import { DoughnutChart } from "./charts/DoughnutChart";

export default async function Summary() {
  const { payload: session } = await getSession();
  const workTimeData = await getWorkTimeByUserId(session.userId);
  const userWages = await getUserWagesByUserId(session.userId);
  const monthWorkTimeMap = calculateMonthWorkTime(workTimeData);

  const totalHoursMin = toHoursAndMinutes(monthWorkTimeMap.get("total"));
  const totalHours = `${totalHoursMin[0]} Hours ${totalHoursMin[1]} Mins`;
  const earningMap = calculateEarnings(userWages, workTimeData);

  const lineChartData = toLineChartData(earningMap.get("month"));
  const barChartData = toBarChartData(monthWorkTimeMap);
  const doughnutChartData = toDoughnutChartData(earningMap);

  const shifts = await getWorkedShiftsByUserId(session.userId);

  return (
    <div className="summary">
      <div className="header__title">
        <h3>Summary</h3>
      </div>
      <div className="container">
        <div className="card">
          <div className="card__text">
            <p className="card__text--title">Work Time Summary</p>
          </div>
          <div className="card__text">
            <p className="card__text--body">{totalHours}</p>
          </div>
        </div>
        <div className="card">
          <div className="card__text">
            <p className="card__text--title">Earnings Overview</p>
          </div>
          <div className="card__text">
            <p className="card__text--body">{`CA$ ${earningMap.get("total").toFixed(2)}`}</p>
          </div>
        </div>
        <div className="card">
          <div className="card__text">
            <p className="card__text--title">Worked Shift Count</p>
          </div>
          <div className="card__text">
            <p className="card__text--body">{`${shifts.length} Shifts`}</p>
          </div>
        </div>
      </div>
      <LineChart data={lineChartData} />
      <div className="container">
        <BarChart data={barChartData} />
        <DoughnutChart data={doughnutChartData} />
      </div>
    </div>
  )
}

function calculateWorkTime(workTimeData) {
  let total = 0;
  let months = new Map();

  for (const workTime of workTimeData) {
    total += workTime.endTime.getTime() - workTime.startTime.getTime();
  }

  return toHoursAndMinutes(total);
}

function calculateTotalWorkTime(workTimeData) {
  let total = 0;

  for (const workTime of workTimeData) {
    total += getTimeDiff(workTime);
  }

  return toHoursAndMinutes(total);
}

function calculateMonthWorkTime(workTimeData) {
  let map = new Map();
  let total = 0;

  for (const workTime of workTimeData) {
    const key = toYearMonthKeyString(workTime.startTime);
    if (!map.has(key)) map.set(key, 0);
    const time = workTime.endTime.getTime() - workTime.startTime.getTime();
    map.set(key, map.get(key) + time);
    total += time;
  }

  map.set("total", total);
  return map;
}

function toYearMonthKeyString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

function getTimeDiff(workTime) {
  return workTime.endTime.getTime() - workTime.startTime.getTime();
}

function toHoursAndMinutes(time) {
  const hours = Math.floor(time / 3600000);
  const mins = Math.round((time % 3600000) / 60000);
  return [hours, mins];
}

function getDate(workTime) {
  const year = workTime.startTime.getFullYear();
  const month = workTime.startTime.getMonth() + 1;
  const date = workTime.startTime.getDate();
  return `${year}/${month}/${date}`;
}

function to12HourClockString(date) {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${amOrPm}`;
}

function calculateEarnings(userWages, workTimeData) {
  let total = 0;
  const departmentWageMap = toDepartmentWageMap(userWages);
  const earningMap = new Map();
  const monthMap = new Map();
  for (const workTime of workTimeData) {
    const department = workTime.workerDepartment.name;
    const [hours, mins] = toHoursAndMinutes(getTimeDiff(workTime));
    const wage = departmentWageMap.get(department);
    const earning = (wage * hours) + (wage * (mins / 60));
    total += earning;

    if (!earningMap.has(department)) {
      earningMap.set(department, new Map());
      earningMap.get(department).set("total", 0);
    };
    const departmentEarningMap = earningMap.get(department);
    const key = toYearMonthKeyString(workTime.startTime);
    if (!departmentEarningMap.has(key)) departmentEarningMap.set(key, 0);
    departmentEarningMap.set(key, departmentEarningMap.get(key) + earning);
    departmentEarningMap.set("total", departmentEarningMap.get("total") + earning);

    if (!monthMap.has(key)) monthMap.set(key, 0);
    monthMap.set(key, monthMap.get(key) + earning);
  }

  earningMap.set("total", total);
  earningMap.set("month", monthMap);
  return earningMap;
}

function toDepartmentWageMap(userWages) {
  const map = new Map();
  for (const { userWageDepartment, wage } of userWages) {
    map.set(userWageDepartment.name, wage.wageAmount);
  }

  return map;
}


function workTimeTable(workTimeData) {
  return (
    <table className="table">
      <thead>
        <tr className="table__row--size-head">
          <td className="table__cell">Date</td>
          <td className="table__cell">Worked Time</td>
          <td className="table__cell">Hours Worked</td>
        </tr>
      </thead>
      <tbody>
        {
          workTimeData.map((workTime, index) => {
            const date = getDate(workTime);
            const time = getTimeDiff(workTime);
            const [hours, mins] = toHoursAndMinutes(time);
            const startEndTime = `${to12HourClockString(workTime.startTime)} - ${to12HourClockString(workTime.endTime)}`;
            return (
              <tr key={index} className="table__row--size-body">
                <td className="table__cell">
                  {`${date}`}
                </td>
                <td className="table__cell">
                  {startEndTime}
                </td>
                <td className="table__cell">
                  {`${hours} hours ${mins} mins`}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

function toLineChartData(earningMap) {
  const data = [];
  earningMap.forEach((value, key) => {
    data.push({
      label: key,
      value: value
    })
  })
  return data;
}

function toDoughnutChartData(earningMap) {
  const data = [];
  earningMap.forEach((value, key) => {
    if (key !== "total" && key !== "month") {
      data.push({
        label: key,
        value: value.get("total")
      })
    }
  })
  return data;
}

function toBarChartData(monthWorkTimeMap) {
  const data = [];
  monthWorkTimeMap.forEach((value, key) => {
    if (key !== "total" || key !== "total") {
      data.push({
        label: key,
        value: value / 3600000
      })
    }
  })
  return data;
}