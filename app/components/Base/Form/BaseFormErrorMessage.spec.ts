import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFormErrorMessage from '~/components/Base/Form/BaseFormErrorMessage.vue'

const slots = {
  default: 'Test slot',
}

describe('BaseFormErrorMessage', () => {
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseFormErrorMessage, { slots })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Should render slots data', () => {
    const wrapper = mount(BaseFormErrorMessage, { slots })
    expect(wrapper.text()).toBe(slots.default)
  })
})
