import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

test("Form calls the event handler it received as props with the right details when a new blog is created", async () => {

    const createBlog = jest.fn();
    const user = userEvent.setup();


    render(<BlogForm createBlog={createBlog} />)

    const blogTitle = screen.getByPlaceholderText("Type title")
    const submitButton = screen.getByText("Create")

    await user.type(blogTitle, "Creating a test blog!!")
    await user.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe("Creating a test blog!!")
})