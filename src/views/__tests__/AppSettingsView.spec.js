import AppSettingsView from '@/views/AppSettingsView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders AppSettingsView', () => {
  const { getByText } = renderComp(AppSettingsView)
  const linkElement = getByText(/Settings/i)
  expect(linkElement).toBeInTheDocument()
})

test('toggle dense', async () => {
  const { getByTestId } = renderComp(AppSettingsView)
  const button = getByTestId('dense')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})

test('toggle dark mode', async () => {
  const { getByTestId } = renderComp(AppSettingsView)
  const button = getByTestId('dark')
  await fireEvent.click(button)
  expect(button).toBeInTheDocument()
})