import NetworkGraphView from '@/views/NetworkGraphView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders NetworkGraphView', () => {
  const { getByText } = renderComp(NetworkGraphView)
  const linkElement = getByText(/Senders \/ Receivers/i)
  expect(linkElement).toBeInTheDocument()
})

test('toggle senders', async () => {
  const { getByTestId } = renderComp(NetworkGraphView)
  const button = getByTestId('toggle-senders')
  await fireEvent.click(button)
  expect(button).toHaveTextContent('Receivers')
})

test('toggle all', async () => {
  const { getByTestId } = renderComp(NetworkGraphView)
  const button = getByTestId('toggle-all')
  await fireEvent.click(button)
  expect(button).toHaveTextContent('select_all')
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(NetworkGraphView, customStore)
  const button = getByText(/test/i)
  await fireEvent.click(button)
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
