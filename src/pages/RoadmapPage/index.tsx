import React, { FC, useCallback, useReducer, useEffect } from "react";
import "./index.scss";
import Planner from "./Planner";
import SearchSidebar from "./SearchSidebar";
import { DragDropContext, DropResult, DragUpdate } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveCourse, deleteCourse } from "../../store/slices/roadmapSlice";
import AddCoursePopup from "./AddCoursePopup";
import { isMobile, isBrowser } from "react-device-detect";

const RoadmapPage: FC = () => {
  const dispatch = useAppDispatch();
  const showSearch = useAppSelector((state) => state.roadmap.showSearch);

  const onDragEnd = useCallback((result: DropResult) => {
    if (result.reason === "DROP") {
      // no destination or dragging to search bar
      if (!result.destination || result.destination.droppableId === "search") {
        // removing from quarter
        if (result.source.droppableId != "search") {
          let [yearIndex, quarterIndex] = result.source.droppableId.split("-");
          dispatch(
            deleteCourse({
              yearIndex: parseInt(yearIndex),
              quarterIndex: parseInt(quarterIndex),
              courseIndex: result.source.index,
            })
          );
        }
        return;
      }

      let movePayload = {
        from: {
          yearIndex: -1,
          quarterIndex: -1,
          courseIndex: -1,
        },
        to: {
          yearIndex: -1,
          quarterIndex: -1,
          courseIndex: -1,
        },
      };

      console.log(
        result.source.droppableId,
        "=>",
        result.destination.droppableId
      );

      // roadmap to roadmap has source
      if (result.source.droppableId != "search") {
        let [yearIndex, quarterIndex] = result.source.droppableId.split("-");
        movePayload.from.yearIndex = parseInt(yearIndex);
        movePayload.from.quarterIndex = parseInt(quarterIndex);
        movePayload.from.courseIndex = result.source.index;
      }
      // search to roadmap has no source (use activeCourse in global state)

      // both have destination
      let [yearIndex, quarterIndex] = result.destination.droppableId.split("-");
      movePayload.to.yearIndex = parseInt(yearIndex);
      movePayload.to.quarterIndex = parseInt(quarterIndex);
      movePayload.to.courseIndex = result.destination.index;

      console.log(movePayload);
      dispatch(moveCourse(movePayload));
    }
  }, []);

  const onDragUpdate = useCallback((initial: DragUpdate) => {
    console.log(initial);
  }, []);

  // do not conditionally renderer because it would remount planner which would discard unsaved changes
  const mobileVersion = (
    <>
      <div className={`main-wrapper mobile ${showSearch ? "hide" : ""}`}>
        <Planner />
      </div>
      <div className={`sidebar-wrapper mobile ${!showSearch ? "hide" : ""}`}>
        <SearchSidebar />
      </div>
    </>
  );

  const desktopVersion = (
    <>
      <div className="main-wrapper">
        <Planner />
      </div>
      <div className="sidebar-wrapper">
        <SearchSidebar />
      </div>
    </>
  );

  return (
    <>
      <div className="roadmap-page">
        <AddCoursePopup />
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          {isMobile && mobileVersion}
          {!isMobile && desktopVersion}
        </DragDropContext>
      </div>
    </>
  );
};

export default RoadmapPage;
