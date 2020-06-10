import VolumeTimelineView from '@/views/VolumeTimelineView.vue'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/vue'
import { renderComp } from '../../../setupTests'

test('renders VolumeTimelineView', () => {
  const { getByText } = renderComp(VolumeTimelineView)
  const linkElement = getByText(/Emails Sent By Day/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders VolumeTimelineView, dark mode', () => {
  const { getByText } = renderComp(VolumeTimelineView, {}, true)
  const linkElement = getByText(/Emails Sent By Day/i)
  expect(linkElement).toBeInTheDocument()
})

test('handleSelect', async () => {
  const customStore = {
    mutations: {
      setVuexState: jest.fn(),
      clearSearch: jest.fn(),
    },
  }
  const { getByText } = renderComp(VolumeTimelineView, customStore)
  await fireEvent.click(getByText(/test/i))
  expect(customStore.mutations.clearSearch).toBeCalledTimes(1)
  expect(customStore.mutations.setVuexState).toBeCalledTimes(1)
})
