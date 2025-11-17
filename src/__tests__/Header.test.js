import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import Header from "../Components/Header";
import { Provider } from "react-redux";
import store from "../store"
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate, // return the navigate function
  };
});

it("Header should Render Correctly", ()=>{
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  )

  const heading = screen.getByRole("heading", {level: 1});
  expect(heading).toHaveTextContent("Reddit Lite");

  const logo = screen.getByRole("img");
  expect(logo).toHaveAttribute("alt", "Reddit Logo")
})

it("Search functionality should work", ()=>{
  mockNavigate.mockClear();

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  )

  const searchText = "Hello World";

  const searchBox = screen.getByRole("textbox");
  userEvent.type(searchBox, searchText);

  expect(searchBox).toHaveValue(searchText);

  const searchButton = screen.getByTestId("searchButton");
  userEvent.click(searchButton);

  expect(mockNavigate).toHaveBeenCalledWith(`/search?query=${encodeURIComponent(searchText)}`);

  const crossButton = screen.getByTestId("crossButton");
  userEvent.click(crossButton);

  expect(searchBox).toHaveTextContent("");
  expect(mockNavigate).toHaveBeenCalledWith("/");
});