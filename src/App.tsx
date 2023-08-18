import React from 'react';
import moment, { Moment } from 'moment';

import logo from './abc-glofox-logo.png';
import './App.css';

type Staff = {
  createdAt: string;
  id: string;
  name: string;
  type: 'trainer' | 'receptionist' | 'admin';
}
type StaffAPIResponse = Staff[];
type Trainer = Staff & {
  type: 'trainer'
};

type AppointmentAPIRequestBody = {
  name: string;
  email: string;
  dateTime: string;
  trainerId: Trainer['id'];
}

const STAFF_ENDPOINT = 'https://64df526f71c3335b25826fcc.mockapi.io/trainers';
const APPOINTMENT_ENDPOINT = 'https://64df526f71c3335b25826fcc.mockapi.io/appointment';

function toMoment(x: string): Moment {
  const date = moment(x);
  if (date.isValid()) {
    return date;
  }
  throw new Error('computer says no');
}

function isTrainer(x: Staff): x is Trainer {
  return x.type === 'trainer';
}

const config = {
  name: {
    id: 'name',
    type: 'email',
    minLength: 1,
    maxLength: 10,
    required: true,
  },
  email: {
    id: 'emailz',
    type: 'email',
    minLength: 5,
    maxLength: 100,
    required: true,
  },
  dateTime: {
    id: 'dateTime',
    type: 'datetime-local',
    min: '1900-01-01',
    max: '2005-31-12',
    required: true,
  },
  trainer: {
    type: 'select',
    options: [/* fetch */],
    required: true,
  }
}

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  // POST to ${APPOINTMENTS_ENDPOINT}
  // Should match AppointmentAPIRequestBody type
}

function App() {
  return (
    <div className="App">
      <header className="app__header">
        <img src={logo} className="ApP--logo" alt="logo" />
      </header>
      <main className="appmain">
        <form onSubmit={onSubmit}>
          <input {...config.name} />
          <label className="field">
            Email:
            <input {...config.email} />
          </label>
          <input {...config.dateTime} type="datetime-local" />
          <input {...config.trainer} />
          <input type="submit" />
        </form>
      </main>
    </div>
  );
}

export default App;
