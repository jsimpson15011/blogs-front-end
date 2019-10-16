import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'

jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App/>
    )
    component.rerender(<App/>)

    await waitForElement(
      () => component.getAllByText('login')
    )

    expect(component.container).not.toHaveTextContent(
      'HTML is easy'
    )
  })

  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    const component = render(
      <App/>
    )
    component.rerender(<App/>)

    await waitForElement(
      () => component.container.querySelector('.blog-list')
    )
    expect(component.container).toHaveTextContent(
      'HTML is easy'
    )
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).toHaveTextContent(
      'The most url methods of HTTP are GET and POST'
    )
  })
})