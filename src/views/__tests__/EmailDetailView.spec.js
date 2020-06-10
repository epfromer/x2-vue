import EmailDetailView from '@/views/EmailDetailView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('cached email', () => {
  const { getByTestId } = renderComp(EmailDetailView)
  expect(getByTestId('emailcard')).toBeInTheDocument()
})

test('fetched email', () => {
  const customStore = {
    getters: {
      getEmailById: () => () => undefined,
    },
  }
  const { getByTestId } = renderComp(EmailDetailView, {}, customStore)
  expect(getByTestId('emailcard')).toBeInTheDocument()
})
