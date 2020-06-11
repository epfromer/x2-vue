import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ColorPicker from '../ColorPicker'

test('renders', async () => {
  const close = jest.fn()
  const { getByText } = renderComp(ColorPicker, { open: true, onClose: close })
  await fireEvent.click(getByText(/test/i))
  expect(close).toBeCalledTimes(1)
})
