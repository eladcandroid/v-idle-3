import type { PropType } from "vue";
import { defineComponent, h } from "vue";

const Vidle = defineComponent({
  render() {
    return h(
      "div",
      {
        class: "v-idle",
      },
      this.display
    );
  },
  emits: ["idle", "remind"],
  props: {
    duration: {
      type: Number,
      // default 5 minutes
      default: 60 * 5,
    },
    events: {
      type: Array as PropType<(keyof WindowEventMap)[]>,
      default: () => ["mousemove", "keypress"],
    },
    loop: {
      type: Boolean,
      default: false,
    },
    reminders: {
      type: Array as PropType<number[]>,
      // array of seconds
      // emit "remind" event on each second
      default: (): number[] => [],
    },
    wait: {
      type: Number,
      default: 0,
    },
  },
  data(): {
    display: string;
    timer: number | undefined;
    start: number;
    counter: number | undefined;
    diff: number;
    minutes: string;
    seconds: string;
  } {
    return {
      display: "",
      timer: undefined,
      start: 0,
      counter: undefined,
      diff: 0,
      minutes: "",
      seconds: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.start = Date.now();
      this.setDisplay();
      this.$nextTick(() => {
        this.setTimer();
        for (let i = this.events.length - 1; i >= 0; i -= 1) {
          window.addEventListener(this.events[i], this.clearTimer);
        }
      });
    }, this.wait * 1000);
  },
  methods: {
    setDisplay() {
      // seconds since start
      this.diff = this.duration - (((Date.now() - this.start) / 1000) | 0);
      if (this.diff < 0 && !this.loop) {
        return;
      }
      this.shouldRemind();

      // bitwise OR to handle parseInt
      const minute = (this.diff / 60) | 0;
      const second = this.diff % 60 | 0;

      this.minutes = `${minute < 10 ? "0" + minute : minute}`;
      this.seconds = `${second < 10 ? "0" + second : second}`;

      this.display = `${this.minutes}:${this.seconds}`;
    },
    shouldRemind() {
      if (this.reminders.length > 0) {
        if (this.reminders.includes(this.diff)) {
          this.remind();
        }
      }
    },
    countdown() {
      this.setDisplay();

      if (this.diff <= 0) {
        this.clearTimer(undefined, this.loop);
      }
    },
    idle() {
      this.$emit("idle");
    },
    remind() {
      this.$emit("remind", this.diff);
    },
    setTimer() {
      this.timer = window.setInterval(this.idle, this.duration * 1000);
      this.counter = window.setInterval(this.countdown, 1000);
    },
    clearTimer(event?: Event, loop = true) {
      window.clearInterval(this.timer);
      window.clearInterval(this.counter);
      if (loop) {
        this.start = Date.now();
        this.diff = 0;
        this.setDisplay();
        this.setTimer();
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
    clearInterval(this.counter);
    for (let i = this.events.length - 1; i >= 0; i -= 1) {
      window.removeEventListener(this.events[i], this.clearTimer);
    }
  },
});

export default Vidle;
