import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFormInput from './BaseFormInput.vue'

const props: InstanceType<typeof BaseFormInput>['$props'] = {
  name: 'name',
  label: 'label',
  type: 'text',
}

describe('BaseFormInput', () => {
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseFormInput, { props })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Should pass props to input', () => {
    const optionalProps = {
      min: '10',
      max: '20',
      placeholder: 'test',
      required: true,
    }
    const wrapper = mount(BaseFormInput, {
      props: { ...props, ...optionalProps },
    })
    const input = wrapper.find('input')
    expect(input.attributes('min')).toBe(optionalProps.min)
    expect(input.attributes('max')).toBe(optionalProps.max)
    expect(input.attributes('placeholder')).toBe(optionalProps.placeholder)
    expect(input.attributes('required')).toBe('')
  })
})
