/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// Initial state for the sidebar
const initialState = {
  isOpen: false, // Sidebar visibility
  isCollapsed: false, // Sidebar collapsed state
};

// Action types as constants
export const ACTION_TYPES = {
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  TOGGLE_COLLAPSE: "TOGGLE_COLLAPSE",
};

// Reducer function
const sidebarReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return { ...state, isOpen: !state.isOpen };
    case ACTION_TYPES.TOGGLE_COLLAPSE:
      return { ...state, isCollapsed: !state.isCollapsed };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create Context
const SidebarContext = createContext();
SidebarContext.displayName = "SidebarContext";

// Provider Component
export const SidebarProvider = ({ children }) => {
  const [controller, dispatch] = useReducer(sidebarReducer, initialState);

  // Memoized value for performance optimization
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

// Custom Hook for using the Sidebar Context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Context module functions (action creators)
export const toggleSidebar = (dispatch) =>
  dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR });

export const toggleCollapse = (dispatch) =>
  dispatch({ type: ACTION_TYPES.TOGGLE_COLLAPSE });

// PropTypes for the provider
SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
