import TimelineView from '@/views/TimelineView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
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

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(TimelineView, customStore)
  const button = getByText(/test/i)
  await fireEvent.click(button)
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
