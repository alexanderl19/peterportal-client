import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { actions } from "@liveblocks/redux";

import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import "./App.scss";

import RoadmapPage from "./pages/RoadmapPage";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      actions.enterRoom("helloworld", {
        roadmap: {
          yearPlans: [],
          activeCourse: null,
          invalidCourses: [],
          showTransfer: false,
          transfers: [],
          showSearch: false,
          showAddCourse: false,
        },
      })
    );

    return () => {
      dispatch(actions.leaveRoom("helloworld"));
    };
  }, [dispatch]);

  return (
    <Router>
      <div className="app-content">
        <RoadmapPage />
      </div>
    </Router>
  );
}
