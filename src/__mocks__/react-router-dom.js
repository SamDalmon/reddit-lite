const React = require('react');

// Simple test-only mock of react-router-dom that provides the pieces used
// in the unit tests: MemoryRouter, Routes, Route, useNavigate, useParams,
// useLocation, Outlet, Link, BrowserRouter. This avoids Jest resolver issues
// with the upstream package's conditional exports.

let currentPath = '/';

function MemoryRouter({ children, initialEntries }) {
  currentPath = Array.isArray(initialEntries) && initialEntries[0] ? initialEntries[0] : '/';
  return React.createElement(React.Fragment, null, children);
}

function BrowserRouter({ children }) {
  return React.createElement(React.Fragment, null, children);
}

function Routes({ children }) {
  // Render children as-is; Route mock will decide what to render
  return React.createElement(React.Fragment, null, children);
}

function Route({ path, element, children }) {
  // Very small path matching: if path is falsy, render children; if path
  // includes :category or :subreddit params, try to match currentPath.
  if (!path) {
    return React.createElement(React.Fragment, null, children);
  }

  // normalize
  const normalize = (p) => p.replace(/(^\/|\/$)/g, '');
  const routeParts = normalize(path).split('/');
  const currentParts = normalize(currentPath).split('/');

  if (routeParts.length !== currentParts.length) {
    return null;
  }

  for (let i = 0; i < routeParts.length; i++) {
    const r = routeParts[i];
    const c = currentParts[i];
    if (r.startsWith(':')) continue; // param
    if (r !== c) return null;
  }

  return element ? React.createElement(element.type || element, element && element.props) : React.createElement(React.Fragment, null, children);
}

function Outlet() { return null; }

function Link({ children }) { return React.createElement(React.Fragment, null, children); }

const useNavigate = jest.fn(() => mockNavigate);

function useParams() {
  // naive extraction: find the last segment if route is /post/:category or /post/:subreddit/:id
  const parts = currentPath.split('/').filter(Boolean);
  if (parts.length === 2 && parts[0] === 'post') {
    return { category: parts[1] };
  }
  if (parts.length === 3 && parts[0] === 'post') {
    return { subreddit: parts[1], id: parts[2] };
  }
  return {};
}

function useLocation() { return { pathname: currentPath }; }

function createBrowserRouter() { return { __mockRouter: true }; }
function createRoutesFromElements(el) { return el; }

const actual = jest.requireActual('react-router-dom');
const mockNavigate = jest.fn();

module.exports = {
  ...actual,
  // make useNavigate return the jest mock so components calling it get the spy
  useNavigate: () => mockNavigate,
  // export the mock so tests can import it directly: import { mockNavigate } from 'react-router-dom';
  __esModule: true,
  MemoryRouter,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  mockNavigate,
  useParams,
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
};
