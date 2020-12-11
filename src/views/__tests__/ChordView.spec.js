import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import ChordView from '../ChordView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(ChordView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
