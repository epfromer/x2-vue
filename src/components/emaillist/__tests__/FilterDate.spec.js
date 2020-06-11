import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../../setupTests'
import FilterDate from '../FilterDate'

test('renders', async () => {
  const onClear = jest.fn()
  const onClose = jest.fn()
  const { getByText } = renderComp(FilterDate, { open: true, onClose, onClear })
  await fireEvent.click(getByText(/handleClear/i))
  expect(onClear).toBeCalledTimes(1)
  await fireEvent.click(getByText(/handleClose/i))
  expect(onClose).toBeCalledTimes(1)
})
