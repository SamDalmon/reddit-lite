import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "../Components/Post";
import  { mockNavigate }  from "react-router-dom";
import userEvent from "@testing-library/user-event";

/*
jest.mock("react-router-dom", () =>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));*/

it("Post should set up correctly", ()=> {
  const post ={
    "id": "1otmkc8",
    "title": "VR recreation of the exact spot where a man became stuck inside Nutty Putty cave and died after 27 hours. the section visible at 18 seconds is where his body was, upside down.",
    "subreddit": "interesting",
    "thumbnail": "https://b.thumbs.redditmedia.com/2DYssCxKZBzQuLvLnUK8JDN6BQmXCHLjgNF0gEviwAs.jpg",
  };

  render(<Post post={post} handleClick={()=>{}}/>);

  const title = screen.getByRole("heading");
  expect(title).toHaveTextContent("VR recreation of the exact spot where a man became stuck inside Nutty Putty cave and died after 27 hours. the section visible at 18 seconds is where his body was, upside down.");

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "https://b.thumbs.redditmedia.com/2DYssCxKZBzQuLvLnUK8JDN6BQmXCHLjgNF0gEviwAs.jpg");
  expect(image).toHaveAttribute("alt", "VR recreation of the exact spot where a man became stuck inside Nutty Putty cave and died after 27 hours. the section visible at 18 seconds is where his body was, upside down.")
});

it("Should redirect to Post Detail page with id in url", ()=>{
  const post ={
    "id": "1otmkc8",
    "title": "VR recreation of the exact spot where a man became stuck inside Nutty Putty cave and died after 27 hours. the section visible at 18 seconds is where his body was, upside down.",
    "subreddit": "interesting",
    "thumbnail": "https://b.thumbs.redditmedia.com/2DYssCxKZBzQuLvLnUK8JDN6BQmXCHLjgNF0gEviwAs.jpg",
  };

  mockNavigate.mockClear();
  const handleClick = (subreddit, id) => mockNavigate(`/post/${subreddit}/${id}`);

  render(<Post post={post} handleClick={handleClick}/>);

  const postContainer = screen.getByRole("main");
  userEvent.click(postContainer);

  expect(mockNavigate).toHaveBeenCalledWith(`/post/${post.subreddit}/${post.id}`);
})
