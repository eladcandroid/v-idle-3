import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Vidle from "../src/components/vidle";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

describe("Basic vidle", () => {
  test("Is a Vue instance", () => {
    const wrapper = mount(Vidle);
    expect(wrapper.exists()).toBeTruthy();
  });

  test("Test mounted", async () => {
    const wrapper = mount(Vidle, {
      props: {
        duration: 660,
      },
    });
    const component = wrapper.vm;
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(component.$data.display).toBe("11:00");
  });

  test("Test unmount", async () => {
    const wrapper = mount(Vidle);
    const component = wrapper.vm;
    vi.advanceTimersByTime(1000);
    await component.$nextTick();
    // should call onBeforeUnmount() then
    wrapper.unmount();
  });

  test("Test time", async () => {
    const wrapper = mount(Vidle, {
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    });
    const component = wrapper.vm;
    vi.advanceTimersByTime(6000);
    component.setDisplay();
    // 60 second minus 6 seconds
    expect(component.$data.display).toBe("00:54");

    vi.clearAllTimers();
  });
});

describe("Test events", () => {
  test("Mousemove", async () => {
    const wrapper = mount(Vidle, {
      // important to test mousemove
      attachTo: document.body,
      props: {
        // set duration for 60 seconds
        duration: 60,
      },
    });
    const component = wrapper.vm;
    vi.advanceTimersByTime(9000);
    component.setDisplay();
    expect(component.$data.display).toBe("00:51");
    await wrapper.trigger("mousemove");
    await wrapper.trigger("mousemove");
    component.setDisplay();
    expect(component.$data.display).toBe("01:00");

    vi.clearAllTimers();
  });
});
