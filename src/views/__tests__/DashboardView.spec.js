import DashboardView from '@/views/DashboardView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('handle click', async () => {
  const { getAllByText } = renderComp(DashboardView)
  const buttons = getAllByText('Chord')
  await fireEvent.click(buttons[0])
  // expect(buttons[0]).toBeInTheDocument()
})
