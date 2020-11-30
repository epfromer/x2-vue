import HomeView from '@/views/HomeView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('handle click', async () => {
  const { getAllByText } = renderComp(HomeView)
  const buttons = getAllByText('Chord')
  await fireEvent.click(buttons[0])
  // expect(buttons[0]).toBeInTheDocument()
})
