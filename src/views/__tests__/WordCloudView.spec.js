import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import WordCloudView from '../WordCloudView'

test('handleClick', async () => {
  const { getByTestId } = renderComp(WordCloudView)
  const button = getByTestId(/handleClick/i)
  await fireEvent.click(button)
})
