import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ContactPicker from '../ContactPicker'

test('renders', async () => {
  const onChange = jest.fn()
  const contactsToShow = new Map()
  contactsToShow.set('foo', true)
  const { getByText } = renderComp(ContactPicker, {
    contactsToShow,
    onChange,
  })
  await fireEvent.click(getByText(/handleDelete/i))
  await fireEvent.click(getByText(/handleClick/i))
  expect(onChange).toBeCalledTimes(2)
})
