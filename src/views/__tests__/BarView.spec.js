import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'
import BarView from '../BarView'

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByTestId } = renderComp(BarView, {}, customStore)
  const button = getByTestId(/barecharts/i)
  await fireEvent.click(button)
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
