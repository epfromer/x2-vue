import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import NetworkGraphView from '../NetworkGraphView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(NetworkGraphView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
