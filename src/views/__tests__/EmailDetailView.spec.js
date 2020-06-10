import EmailDetailView from '@/views/EmailDetailView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders card', () => {
  const { getByTestId } = renderComp(EmailDetailView)
  expect(getByTestId('emailcard')).toBeInTheDocument()
})
