import React from 'react'
import Blog from './Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'Test Url',
    likes: 0,
    user: {
      name: 'test name',
      username: 'test username'
    }
  }
  const user = {
    name: 'test name',
    username: 'test username'
  }
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
      />
    )
  })

  test('only blog name and author visible initially', () => {
    const nameAndAuthor = component.container.querySelector('.name-and-author')
    const blogDetails = component.container.querySelector('.blog-details')

    expect(nameAndAuthor).toHaveTextContent('Test Blog Test Author')
    expect(blogDetails).toHaveStyle('display:none')
  })

  test('blog details show when post is clicked', () => {
    const nameAndAuthor = component.container.querySelector('.name-and-author')
    fireEvent.click(nameAndAuthor)

    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).not.toHaveStyle('display:none')
  })
})