import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import CategoryButtons from "../Components/CategoryButtons";
import { Provider } from "react-redux";
import { initilizeStore } from "../store";
import categoryList from "../res/categoryList";
import Root from "../Components/Root";
import Header from "../Components/Header";
import Home from "../Components/Home";
import CategoryResults from "../Features/CategoryResults/CategoryResults";
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
  const selectedCategory = categoryList[2];
  /*<Route path="/post/:category" element={<Header />}/>*/
  
  render(
    <MemoryRouter initialEntries={[`/post/${selectedCategory.value}`]}>
      <Provider store={store}>
        <Routes>
          <Route path="/post/:category" element={ <Header /> } />
        </Routes>
      </Provider>
    </MemoryRouter>
  );
  
  let selectedButton = screen.getByText(selectedCategory.text);
  userEvent.click(selectedButton);
  expect(mockNavigate).toHaveBeenCalledWith(`/post/${selectedCategory.value}`);

  categoryList.forEach((category)=>{
    const checkButton = screen.getByText(category.text);
    let bgColor = "gray";
    if(category === selectedCategory){
      bgColor = "blue";
    }
    expect(checkButton).toHaveStyle({backgroundColor: bgColor});
  })  
})