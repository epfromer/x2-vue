import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import PieView from '../PieView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(PieView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
