import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ColorPicker from '../ColorPicker'

test('renders', async () => {
  const onClose = jest.fn()
  const { getByText } = renderComp(ColorPicker, { open: true, onClose })
  await fireEvent.click(getByText(/test/i))
  expect(onClose).toBeCalledTimes(1)
})
