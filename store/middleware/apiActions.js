import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/CallBegan");
//createAction returns a function, and sets the type = name of const, ej: type: apiCallBegan
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
