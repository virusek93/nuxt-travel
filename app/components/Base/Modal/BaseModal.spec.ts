import { describe, expect, it, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '~/components/Base/Modal/BaseModal.vue'

const props: InstanceType<typeof BaseModal>['$props'] = {
  isModalOpen: false,
}

describe('BaseModal', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })
  it('Should render and match the snapshot', () => {
    const wrapper = mount(BaseModal, { props })
    expect(wrapper.element).toMatchSnapshot()
  })
  it('Should call showModal on dialog element when isModalOpen sets to true', async () => {
    const wrapper = mount(BaseModal, { props })
    // @ts-expect-error vue-closed composition API
    const spy = vi.spyOn(wrapper.vm.dialogRef, 'showModal')
    await wrapper.setProps({ isModalOpen: true })
    expect(spy).toHaveBeenCalled()
  })
  it('Should call close on dialog element when isModalOpen sets to false', async () => {
    const wrapper = mount(BaseModal, { props: { isModalOpen: true } })
    // @ts-expect-error vue-closed composition API
    const spy = vi.spyOn(wrapper.vm.dialogRef, 'close')
    await wrapper.setProps({ isModalOpen: false })
    expect(spy).toHaveBeenCalled()
  })
  it('Should render slot details', () => {
    const defaultSlotData = 'Test default'
    const wrapper = mount(BaseModal, {
      props: { isModalOpen: true },
      slots: { default: defaultSlotData },
    })
    expect(wrapper.text().includes(defaultSlotData))
  })
})
