import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFormTextArea from '~/components/Base/Form/BaseFormTextArea.vue'

const props: InstanceType<typeof BaseFormTextArea>['$props'] = {
  name: 'areaName',
  label: 'areaLabel',
  placeholder: 'areaPlaceholder',
  customClass: 'test-custom-class',
}

describe('BaseFormTextArea', () => {
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseFormTextArea, { props })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Should pass props to textarea attr', () => {
    const wrapper = mount(BaseFormTextArea, { props })
    const textArea = wrapper.find('textarea')
    expect(textArea.attributes('name')).toBe(props.name)
    expect(textArea.attributes('id')).toBe(props.name)
    expect(textArea.attributes('placeholder')).toBe(props.placeholder)
    expect(
      textArea.attributes('class')?.includes(props.customClass ?? ''),
    ).toBe(true)
  })
})
