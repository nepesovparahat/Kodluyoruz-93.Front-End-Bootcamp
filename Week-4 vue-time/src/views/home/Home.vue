<template>
  <div class="home">
    <h2 class="page-header">Timer</h2>
    <div class="home__timer-remaining">
      <div class="home__timer-remaining-txt">{{ startedHour }}</div>:
      <div class="home__timer-remaining-txt">{{ startedMin }}</div>:
      <div class="home__timer-remaining-txt">{{ startedSec }}</div>
    </div>
    <div class="home__timer-reamining-btn">
      <button class="home__timer-btn" v-if="btnStartActive" @click="start">Start</button>
      <button class="home__timer-btn" v-if="btnStopActive" @click="stop">Stop</button>
      <button class="home__timer-btn" v-if="btnResetActive" @click="reset">Reset</button>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    let btnStartActive = ref(true);
    let btnStopActive = ref(false);
    let btnResetActive = ref(false);
    let startedHour = ref("0" + 0);
    let startedMin = ref("0" + 0);
    let startedSec = ref("0" + 0);
    let time = ref(60);
    let timer = "";
    function start() {
      btnStartActive.value = false;
      btnStopActive.value = true;
      btnResetActive.value = false;
      timer = setInterval(countDownUpdate, 1000);
    }
	

    function countDownUpdate() {
      let timerAudio = new Audio(
        "https://audio-previews.elements.envatousercontent.com/files/83038071/preview.mp3"
      );
      startedSec.value = time.value % 60;
      startedMin.value = Math.floor(time.value / 60);
      startedHour.value = Math.floor(startedMin.value / 60);
      startedMin.value %= 60;
      startedHour.value %= 60;
      startedHour.value = startedHour.value < 10 ? "0" + startedHour.value : startedHour.value;
      startedMin.value = startedMin.value < 10 ? "0" + startedMin.value : startedMin.value;
      startedSec.value = startedSec.value < 10 ? "0" + startedSec.value : startedSec.value;
	   if (time.value === 0) {
        timerAudio.play();
        stop();
      }
	  time.value--;
      console.log("CountdownUpdate : Parahat 🔥", time);
    }
    function stop() {
      clearInterval(timer);
      btnStartActive.value = true;
      btnResetActive.value = true;
      btnStopActive.value = false;
    }

    function reset() {
      stop();
      startedHour.value = "0" + 0;
      startedMin.value = "0" + 0;
      startedSec.value = "0" + 0;
      time.value = 60;
      countDownUpdate();
      btnResetActive.value = false;
    }
    onMounted(() => console.log("Mount: ⛰ Home Component"));
    onUnmounted(() => stop());
    return {
      btnResetActive,
      btnStopActive,
      btnStartActive,
      startedHour,
      startedMin,
      startedSec,
      countDownUpdate,
      start,
      stop,
      reset,
    };
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__timer-remaining {
    display: flex;
    flex-direction: row;
    font-size: 180px;
    font-weight: bolder;
  }
  &__timer-btn-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__timer-btn {
    margin-top: 40px;
  }
  &__timer-reamining-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__timer-remaining-txt {
    margin: 0 20px;
  }
  &__timer-btn {
    min-width: 120px;
    height: 60px;
    border-radius: 999px;
    margin: 12px 0;
    background: #fc0;
    font-weight: bold;
    outline: none;
    border: none;
    cursor: pointer;
  }
}
</style>
