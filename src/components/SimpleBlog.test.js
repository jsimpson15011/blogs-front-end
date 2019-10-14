import React from 'react'
import SimpleBlog from './SimpleBlog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<SimpleBlog />', () => {
  let component
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    likes: 0
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog}/>
    )
  })

  test('renders title', () => {
    const titleAndAuthor = component.container.querySelector('.title-and-author')

    expect(titleAndAuthor).toHaveTextContent(
      'Test Blog Test Author'
    )
  })

  test('renders number of likes', () => {
    const likes = component.container.querySelector('.likes')

    expect(likes).toHaveTextContent(
      'blog has 0 likes'
    )
  })

  test('clicking like button twice calls event handler twice', () => {
    const mockHandler = jest.fn()

    const test = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const likeButton = test.container.querySelector('.like-button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})