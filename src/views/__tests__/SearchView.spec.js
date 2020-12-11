import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import SearchView from '../SearchView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(SearchView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})

test('openDatePicker', async () => {
  const { getByTestId } = renderComp(SearchView)
  let button = getByTestId(/openDatePicker/i)
  await fireEvent.click(button)
  button = getByTestId(/handleClear/i)
  await fireEvent.click(button)
  button = getByTestId(/handleClose/i)
  await fireEvent.click(button)
})

test('onHistoryClick', async () => {
  const { getByTestId } = renderComp(SearchView)
  let button = getByTestId(/onHistoryClick/i)
  await fireEvent.click(button)
})
