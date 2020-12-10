import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import BarView from '../BarView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(BarView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
