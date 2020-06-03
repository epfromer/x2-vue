import TimelineView from '@/views/TimelineView.vue'
import '@testing-library/jest-dom'
import { renderComp } from '../../../jest.setup'

// https://testing-library.com/docs/vue-testing-library/intro

test('renders timeline', () => {
  const { getByText } = renderComp(TimelineView)
  const linkElement = getByText(/Emails Sent By Day/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders timeline, dark mode', () => {
  const { getByText } = renderComp(TimelineView, { state: { darkMode: true } })
  const linkElement = getByText(/Emails Sent By Day/i)
  expect(linkElement).toBeInTheDocument()
})
