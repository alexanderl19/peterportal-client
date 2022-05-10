import React from "react";
import "./SearchSidebar.scss";
import { PlusCircle } from "react-bootstrap-icons";
import { Droppable } from "react-beautiful-dnd";
import CloseButton from "react-bootstrap/CloseButton";
import { isMobile, isBrowser } from "react-device-detect";
import { useAppDispatch } from "../../store/hooks";
import { setShowSearch } from "../../store/slices/roadmapSlice";

import SearchModule from "./SearchModule";
import SearchHitContainer from "./SearchHitContainer";
import {
  SearchkitComponent,
  SearchkitManager,
  SearchkitProvider,
  SearchkitComponentProps,
} from "searchkit";

const SearchSidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="search-sidebar">
      {isMobile && (
        <div>
          <CloseButton
            className="close-icon"
            onClick={() => {
              dispatch(setShowSearch(false));
            }}
          />
        </div>
      )}
      <div className="search-body">
        <Droppable droppableId="search" type="COURSE">
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                style={{ height: "100%" }}
                {...provided.droppableProps}
              >
                <Search />
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

class Search extends SearchkitComponent<SearchkitComponentProps, {}> {
  render() {
    // 'this.props.match.params.index' is used to determine which index to
    // query via url location - i.e: (professor || courses)
    let searchkit = new SearchkitManager("https://peterportal.org/courses");

    return (
      <SearchkitProvider searchkit={searchkit}>
        <>
          <div
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <SearchModule query={"courses"} />
              <SearchHitContainer query={"courses"} />
            </div>
          </div>
        </>
      </SearchkitProvider>
    );
  }
}

export default SearchSidebar;
