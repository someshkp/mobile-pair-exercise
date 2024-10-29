import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";

import logo from "./abc-glofox-logo.png";
import "./App.css";
import axios from "axios";

type Staff = {
  createdAt: string;
  id: string;
  name: string;
  type: "trainer" | "receptionist" | "admin";
};
type StaffAPIResponse = Staff[];
type Trainer = Staff & {
  type: "trainer";
};

type AppointmentAPIRequestBody = {
  name: string;
  email: string;
  dateTime: string;
  trainerId: Trainer["id"];
};

const STAFF_ENDPOINT = "https://64df526f71c3335b25826fcc.mockapi.io/trainers";
const APPOINTMENT_ENDPOINT =
  "https://64df526f71c3335b25826fcc.mockapi.io/appointment";

function toMoment(x: string): Moment {
  const date = moment(x);
  if (date.isValid()) {
    return date;
  }
  throw new Error("computer says no");
}

function isTrainer(x: Staff): x is Trainer {
  return x.type === "trainer";
}

const config = {
  name: {
    id: "name",
    name: "name",
    type: "email",
    minLength: 1,
    maxLength: 10,
    required: true,
  },
  email: {
    id: "email",
    name: "email",
    type: "email",
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  dateTime: {
    id: "dateTime",
    name: "dateTime",
    type: "datetime-local",
    min: "1900-01-01",
    max: "2005-31-12",
    required: true,
  },
  trainer: {
    id: "trainer",
    name: "trainer",
    type: "select",
    options: [
      /* fetch */
    ],
    required: true,
  },
};

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  // POST to ${APPOINTMENTS_ENDPOINT}
  // Should match AppointmentAPIRequestBody type
}

function App() {
  const [trainerList, setTrainerList] = useState<Staff[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64df526f71c3335b25826fcc.mockapi.io/trainers"
        );
        setTrainerList(response.data); // Handle the response data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("trainerList", trainerList);

  return (
    <div className="App">
      <header className="app__header">
        <img src={logo} className="ApP--logo" alt="logo" />
      </header>
      <main className="appmain">
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <div className="email-container">
              <label>Email:</label>
              <input id="email" type="email" />
            </div>
            <div className="date-container">
              <label htmlFor="dateTime">Date:</label>
              <input id="dateTime" type="datetime-local" />
            </div>
            <div className="trainer-container">
              <label htmlFor="trainer">Trainer</label>
              <select id="trainer" name="trainer">
                <option value="">Select a trainer</option>
                {trainerList
                  ?.filter((tr) => tr.type === "trainer")
                  .map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}

                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          {/* <input id="name" name="name" />
          <label className="field">
            Email:
            <input id="email" name="email" />
          </label>
          <input id="dateTime" type="datetime-local" />
          <input id="trainer" name="trainer" />
          <input type="submit" /> */}
        </form>
      </main>
    </div>
  );
}

export default App;
