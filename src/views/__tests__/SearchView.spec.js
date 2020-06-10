import SearchView from '@/views/SearchView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders table', () => {
  const { getByTestId } = renderComp(SearchView)
  const table = getByTestId('datatable')
  expect(table).toBeInTheDocument()
})

test('search fields', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
    },
  }
  const { getByTestId } = renderComp(SearchView, customStore)
  await fireEvent.update(getByTestId('computedSent'), 'foo')
  await fireEvent.update(getByTestId('computedFrom'), 'foo')
  await fireEvent.update(getByTestId('computedTo'), 'foo')
  await fireEvent.update(getByTestId('computedSubject'), 'foo')
  await fireEvent.update(getByTestId('computedAllText'), 'foo')
  expect(customStore.mutations.setVuexState).toBeCalledTimes(5)
})

test('handleTimeSpan', async () => {
  const { getByTestId } = renderComp(SearchView)
  const button = getByTestId('handleTimeSpan')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('rowClick', async () => {
  const { getByTestId } = renderComp(SearchView)
  const button = getByTestId('rowClick')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})
