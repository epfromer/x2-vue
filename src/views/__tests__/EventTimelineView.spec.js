import EventTimelineView from '@/views/EventTimelineView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('toggle vertical', async () => {
  const { getByTestId } = renderComp(EventTimelineView)
  const button = getByTestId('toggle-vertical')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(EventTimelineView, {}, customStore)
  const button = getByText(/test/i)
  await fireEvent.click(button)
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
