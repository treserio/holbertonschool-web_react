import uiReducer from "./uiReducer";

const initStateFalse = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

const initStateTrue = {
  isNotificationDrawerVisible: true,
  isUserLoggedIn: true,
  user: {},
};

describe("uiReducer testing", () => {
  it("returns the initial state when no action is passed", () => {
    expect(uiReducer(undefined, {})).toEqual(initStateFalse);
  });

  it("returns the initial state when the action SELECT_COURSE is passed", () => {
    expect(uiReducer(initStateFalse, { type: "SELECT_COURSE" })).toEqual(initStateFalse);
    expect(uiReducer(initStateTrue, { type: "SELECT_COURSE" })).toEqual(initStateTrue);
  })

  it("returns new state when the action DISPLAY_NOTIFICATION_DRAWER is passed", () => {
    expect(uiReducer(initStateFalse, { type: 'DISPLAY_NOTIFICATION_DRAWER' })).toEqual({
      ...initStateFalse,
      isNotificationDrawerVisible: true,
    });
  })

  it("returns new state when the action LOGIN_SUCCESS is passed", () => {
    expect(uiReducer(initStateFalse, { type: 'LOGIN_SUCCESS' })).toEqual({
      ...initStateFalse,
      isUserLoggedIn: true,
    });
  });

  it("returns new state when the action HIDE_NOTIFICATION_DRAWER is passed", () => {
    expect(uiReducer(initStateTrue, { type: 'HIDE_NOTIFICATION_DRAWER' })).toEqual({
      ...initStateTrue,
      isNotificationDrawerVisible: false,
    });
  })

  it("returns new state when the action LOGIN_FAILURE is passed", () => {
    expect(uiReducer(initStateTrue, { type: 'LOGIN_FAILURE' })).toEqual({
      ...initStateTrue,
      isUserLoggedIn: false,
    });
  });

  it("returns new state when the action LOGOUT is passed", () => {
    expect(uiReducer(initStateTrue, { type: 'LOGOUT' })).toEqual({
      ...initStateTrue,
      isUserLoggedIn: false,
    });
  });
});
