import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import VolumeTimelineView from '../VolumeTimelineView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(VolumeTimelineView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
