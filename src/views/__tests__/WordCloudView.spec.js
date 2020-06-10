import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import WordCloudView from '../WordCloudView'

test('renders word cloud', () => {
  const { getByText } = renderComp(WordCloudView)
  const linkElement = getByText(/Email Word Cloud/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders word cloud dark mode', () => {
  const { getByText } = renderComp(WordCloudView, {}, {}, true)
  const linkElement = getByText(/Email Word Cloud/i)
  expect(linkElement).toBeInTheDocument()
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(WordCloudView, {}, customStore)
  await fireEvent.click(getByText(/test/i))
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
