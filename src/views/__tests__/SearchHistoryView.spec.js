import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import SearchHistoryView from '../SearchHistoryView'

test('onClearHistory', async () => {
  const { getByTestId } = renderComp(SearchHistoryView)
  const button = getByTestId(/onClearHistory/i)
  await fireEvent.click(button)
})

test('onSearchHistory', async () => {
  const { getByTestId } = renderComp(SearchHistoryView)
  const button = getByTestId(/onSearchHistory/i)
  await fireEvent.click(button)
})
