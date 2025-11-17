import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import CategoryButtons from "../Components/CategoryButtons";
import { Provider } from "react-redux";
import { initilizeStore } from "../store";
import categoryList from "../res/categoryList";
import Header from "../Components/Header";
import userEvent from "@testing-library/user-event";
import { mockNavigate, MemoryRouter, Route, Routes } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

let store;
beforeEach(()=>{
  store = initilizeStore();
});

/*
jest.mock("react-router-dom", () =>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));*/

it("Category buttons should render correctly", ()=>{
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <Header />
      </Provider>
    </MemoryRouter>
  );

  categoryList.forEach((category)=>{
    const button = screen.getByText(category.text);
    expect(button).toBeInTheDocument();

    const buttonStyle = window.getComputedStyle(button);
    expect(buttonStyle.backgroundColor).toBe('gray')
  })
});

it("Category button should highlight and change url when pressed", async ()=>{
  mockNavigate.mockClear();

  const firstCategory = categoryList[0];
  /*<Route path="/post/:category" element={<Header />}/>*/
  
  render(
    <MemoryRouter initialEntries={[`/post/cute`]}>
      <Provider store={store}>
        <Routes>
          <Route path="/post/:category" element={<Header />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

  
  const firstButton = screen.getByText(firstCategory.text);
  expect(firstButton).toHaveStyle({backgroundColor: 'blue'});
  userEvent.click(firstButton);

  expect(mockNavigate).toHaveBeenCalledWith(`/post/${firstCategory.value}`);
  
 
  /*
  await waitFor(()=>{
    expect(firstButton).toHaveStyle({backgroundColor: 'blue'});
  }, {timeout: 3000});
  */
  
})