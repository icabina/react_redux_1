import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  loadBugs,
  getUnresolvedBugs,
  resolveBug,
} from "../store/slices/bugsSlice";
const BugsListFunctional = () => {
  //=====================================
  const dispatch = useDispatch();
  //=====================================
  //const bugs = useSelector((state) => state.entities.bugs.list);
  //or....
  //get the array of bugs in the bugsSlice
  const bugs = useSelector(getUnresolvedBugs);
  //=====================================
  useEffect(() => {
    dispatch(loadBugs());
  });
  //=====================================
  return (
    <ul>
      {bugs.map((b) => (
        <li key={b.id}>
          {b.description}{" "}
          <button onClick={() => dispatch(resolveBug(b.id))}>
            Resolve in functional
          </button>
        </li>
      ))}
    </ul>
  );
};

export default BugsListFunctional;
