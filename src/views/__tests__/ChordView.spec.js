import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ChordView from '../ChordView'

test('renders chord', () => {
  const { getByText } = renderComp(ChordView)
  const linkElement = getByText(/Senders \/ Receivers/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders chord dark mode', () => {
  const { getByText } = renderComp(ChordView, {}, true)
  const linkElement = getByText(/Senders \/ Receivers/i)
  expect(linkElement).toBeInTheDocument()
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(ChordView, customStore)
  const button = getByText(/test/i)
  await fireEvent.click(button)
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(2)
})
