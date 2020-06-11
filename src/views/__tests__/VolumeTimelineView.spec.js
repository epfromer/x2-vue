import VolumeTimelineView from '@/views/VolumeTimelineView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(VolumeTimelineView, {}, customStore)
  await fireEvent.click(getByText(/test/i))
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
