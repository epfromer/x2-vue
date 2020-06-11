import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ContactSettings from '../ContactSettings'

test('renders', async () => {
  const customStore = {
    actions: {
      fetchContactsIfNeeded: jest.fn(),
    },
  }
  const { getByText } = renderComp(ContactSettings, {}, customStore)
  await fireEvent.click(getByText(/selectColor/i))
  await fireEvent.click(getByText(/handleColorChosen/i))
  expect(customStore.actions.fetchContactsIfNeeded).toBeCalledTimes(1)
})
