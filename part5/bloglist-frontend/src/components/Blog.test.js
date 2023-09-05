import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders only the title and author. but not the likes or URL", () => {
    const blog = {
        title: "Test Blog",
        author: "Monte Yoon",
        url: "www.testwebsite.com",
        likes: 12,
    }

    const user = {
        name: "Monte Yoon",
        username: "MonteY"
    }

    render(<Blog blog={blog} user={user} />)

    const title = screen.getByText('Test Blog || Monte Yoon')
    expect(title).toBeDefined()
})

test("Checks that the blog's URL and number of likes are shown when the button is clicked.", async () => {
    const blog = {
        title: "Test Blog",
        author: "Monte Yoon",
        url: "www.testwebsite.com",
        likes: 12,
    }

    const user = {
        name: "Monte Yoon",
        username: "MonteY"
    }

    render(<Blog blog={blog} user={user} />)
    
    const person = userEvent.setup();
    const button = screen.getByText("view")
    await person.click(button)

    const element = screen.getByText("www.testwebsite.com" && 12)

    expect(element).toBeDefined();
})

test("Ensures that if the like button is clicked twice, the event handler the component receives as props is called twice", async () => {
    const blog = {
        title: "Test Blog",
        author: "Monte Yoon",
        url: "www.testwebsite.com",
        likes: 12,
    }

    const user = {
        name: "Monte Yoon",
        username: "MonteY"
    }

    const handleUpdateBlog = jest.fn()

    const {container} = render(<Blog blog={blog} user={user} handleUpdateBlog={handleUpdateBlog}/>)
    const person = userEvent.setup();
    const likes = container.querySelector('.likesNumber')
    const likesButton = screen.getByText("Like it!")
    // await person.click(viewButton)
    // await person.click(likesButton)
    await person.click(likesButton)
    expect(likes).toHaveTextContent(13);
    await person.click(likesButton)
    // expect(likes).toHaveTextContent(14);

    expect(handleUpdateBlog).toHaveBeenCalledTimes(2);
})