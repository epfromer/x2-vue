import DashboardView from '@/views/DashboardView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders table', () => {
  const { getByTestId } = renderComp(DashboardView)
  expect(getByTestId('chord')).toBeInTheDocument()
})
