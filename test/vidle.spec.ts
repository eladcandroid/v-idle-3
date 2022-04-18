import { mount } from '@vue/test-utils'
import { advanceBy, clear } from 'jest-date-mock'
import Vidle from '../src/components/vidle'

jest.useFakeTimers()

describe('Basic vidle', () => {
  test('Is a Vue instance', () => {
    const wrapper = mount(Vidle)
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Test mounted', async () => {
    const wrapper = mount(Vidle, {
      props: {
        duration: 660,
      },
    })
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick()
    expect(component.$data.display).toBe('11:00')
  })

  test('Test unmount', () => {
    const wrapper = mount(Vidle)
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    component.$nextTick()
    // should call onBeforeUnmount() then
    wrapper.unmount()
  })

  test('Test time', async () => {
    const wrapper = mount(Vidle, {
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    })
    const component = wrapper.vm
    // wait until display will be shown
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(6000)
    component.setDisplay()
    // 60 second minus 6 seconds
    expect(component.$data.display).toBe('00:54')

    clear()
  })

  test('Test idle', async () => {
    const wrapper = mount(Vidle, {
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    })
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(60000)
    component.setDisplay()
    jest.runTimersToTime(60000)
    await component.$nextTick()
    expect(component.$data.display).toBe('00:00')
    advanceBy(5000)
    component.setDisplay()
    expect(component.$data.display).toBe('00:00')
    expect(wrapper.emitted().idle).toBeTruthy()

    clear()
  })
})

describe('Test countdown', () => {
  test('Basic countdown', async () => {
    const wrapper = mount(Vidle, {
      // important to test mousemove
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    })
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(60000)
    component.setDisplay()
    jest.runTimersToTime(60000)
    await component.$nextTick()
    expect(component.$data.display).toBe('00:00')
    advanceBy(5000)
    component.setDisplay()
    expect(component.$data.display).toBe('00:00')
    expect(wrapper.emitted().idle).toBeTruthy()

    clear()
  })

  test('Countdown with loop', async () => {
    const wrapper = mount(Vidle, {
      // important to test mousemove
      props: {
        // set duration for 60 seconds
        duration: 60,
        loop: true,
      },
    })
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(60000)
    component.setDisplay()
    jest.runTimersToTime(60000)
    await component.$nextTick()
    expect(component.$data.display).toBe('01:01')
    advanceBy(6000)
    component.setDisplay()
    expect(component.$data.display).toBe('00:55')
    expect(wrapper.emitted().idle).toBeTruthy()

    clear()
  })
})

describe('Test reminders', () => {
  test('Basic reminder', async () => {
    const wrapper = mount(Vidle, {
      props: {
        // set duration for 60 seconds
        duration: 60,
        // first reminder, when 50 second last
        reminders: [49, 50],
      },
    })
    const component = wrapper.vm
    const spyUpdate = jest.spyOn(component, 'remind')
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(9000)
    component.setDisplay()
    expect(spyUpdate).toHaveBeenCalledTimes(0)
    advanceBy(1000)
    component.setDisplay()
    expect(spyUpdate).toHaveBeenCalledTimes(1)
    advanceBy(1000)
    component.setDisplay()
    expect(spyUpdate).toHaveBeenCalledTimes(2)
    expect(wrapper.emitted().remind).toBeTruthy()

    clear()
  })
})

describe('Test events', () => {
  test('Mousemove', async () => {
    const wrapper = mount(Vidle, {
      // important to test mousemove
      attachTo: document.body,
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    })
    const component = wrapper.vm
    jest.advanceTimersByTime(1000)
    await component.$nextTick()
    advanceBy(9000)
    component.setDisplay()
    expect(component.$data.display).toBe('00:51')
    component.setDisplay()
    await wrapper.trigger('mousemove')
    await wrapper.trigger('mousemove')
    // after mousemove display should be resetted
    expect(component.$data.display).toBe('01:00')

    clear()
  })
})
