<template>
  <div class="home">
    <h2 class="page-header">Timer</h2>
    <div class="home__timer-remaining">
      <div class="home__timer-remaining-txt">{{ startedHour }}</div>:
      <div class="home__timer-remaining-txt">{{ startedMin }}</div>:
      <div class="home__timer-remaining-txt">{{ startedSec }}</div>
    </div>
    <div class="home__timer-reamining-btn">
      <button class="home__timer-btn" v-if="!isTimerActive" @click="start">Start</button>
      <template v-else>
        <button class="home__timer-btn" @click="stop">Stop</button>
        <button class="home__timer-btn"  @click="reset">Reset</button>
      </template>
      
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  setup() {
    let isTimerActive = ref(false);
    let startedHour = ref("0" + 0);
    let startedMin = ref("0" + 0);
    let startedSec = ref("0" + 0);
    let time = ref(60);
    let timer = "";
    function start() {
      if(isTimerActive.value) return '';
      timer = setInterval(countDownUpdate, 1000);
    }
	

    function countDownUpdate() {
      isTimerActive.value = true;
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
      isTimerActive.value = false
    }

    function reset() {
      stop();
      startedHour.value = "0" + 0;
      startedMin.value = "0" + 0;
      startedSec.value = "0" + 0;
      time.value = 60;
    }
    onMounted(() => console.log("Mount: ⛰ Home Component"));
    onUnmounted(() => stop());
    return {
      isTimerActive,
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
