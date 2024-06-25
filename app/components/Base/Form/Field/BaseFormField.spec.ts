import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseFormField from '~/components/Base/Form/Field/BaseFormField.vue'
import { getTestElement } from '~/utils/tests'

const props: InstanceType<typeof BaseFormField>['$props'] = {
  name: 'testName',
  label: 'testLabel',
  errorMessage: 'testErrorMessage',
}

describe('BaseFormField', () => {
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseFormField, { props })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Should set name and render label text', () => {
    const wrapper = mount(BaseFormField, { props })
    const label = wrapper.find(getTestElement('form-label'))
    expect(label.attributes('for')).toBe(props.name)
    expect(label.text()).toBe(props.label)
  })
  it('Should render errorMessage only if errorMessage exists', async () => {
    const wrapper = mount(BaseFormField, { props })
    const errorMessage = wrapper.find(getTestElement('error'))
    expect(errorMessage.exists()).toBeTruthy()
    expect(errorMessage.text()).toBe(props.errorMessage)
    await wrapper.setProps({ errorMessage: undefined })
    expect(wrapper.find(getTestElement('error')).exists()).toBeFalsy()
  })
})
