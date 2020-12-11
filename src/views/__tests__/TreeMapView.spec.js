import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import TreeMapView from '../TreeMapView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(TreeMapView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
