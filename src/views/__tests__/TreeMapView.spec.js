import TreeMapView from '@/views/TreeMapView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders timeline', () => {
  const { getByText } = renderComp(TreeMapView)
  let linkElement = getByText(/Named Senders to Any Recipient/i)
  expect(linkElement).toBeInTheDocument()
  linkElement = getByText(/Named Receivers from Any Sender/i)
  expect(linkElement).toBeInTheDocument()
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(TreeMapView, customStore)
  await fireEvent.click(getByText(/fromtest/i))
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
