import React, { useState } from "react";
import { withCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

const defaultGoalDate = () => {
  var CurrentDate = new Date();
  CurrentDate.setMonth(CurrentDate.getMonth() + 1);
  return CurrentDate;
};

const App = (props) => {
  const { cookies } = props;
  const [goalDate, setGoalDate] = useState(
    new Date(cookies.get("goalDate") || defaultGoalDate())
  );

  let oneDay = 24 * 60 * 60 * 1000,
    firstDate = new Date(),
    diffDays = Math.round(
      Math.abs((firstDate.getTime() - goalDate.getTime()) / oneDay)
    );

  while (firstDate <= goalDate) {
    firstDate = new Date(+firstDate + oneDay);
  }

  const handleChange = (date) => {
    if (date !== null) {
      setGoalDate(date);
      cookies.set("goalDate", date, {
        path: "/",
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    } else {
      setGoalDate(defaultGoalDate());

      cookies.set("goalDate", this.defaultGoalDate(), {
        path: "/",
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Countdown</h1>
        <div className="row">
          <label htmlFor="datepicker">Date:</label>
          <DatePicker
            id="datepicker"
            selected={goalDate}
            onChange={handleChange}
            minDate={new Date()}
            isClearable={false}
            showDisabledMonthNavigation
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <p>
          <strong>{diffDays} Days left</strong>
          <br />
        </p>
      </header>
    </div>
  );
};

export default withCookies(App);
