import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseHeader from '~/components/Base/Header/BaseHeader.vue'

const global = {
  stubs: {
    RouterLink: true,
  },
}

describe('BaseHeader', () => {
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseHeader, { global })
    expect(wrapper.element).toMatchSnapshot()
  })
})
