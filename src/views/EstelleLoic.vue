<script setup>
import Pulse from '../components/Pulse.vue'
import { ref, onMounted } from 'vue'
import * as confetti from 'canvas-confetti'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()

const isGirl = ref(true)

const settingsObj = {
  c11: { type: "color", defaultValue:"32a852" },
  c12: { type: "color", defaultValue:"177530" },
  c21: { type: "color", defaultValue:"32a852" },
  c22: { type: "color", defaultValue:"177530" },
  c31: { type: "color", defaultValue:"32a852" },
  it1: { type: "text", defaultValue:"default" },
  pt1: { type: "text", defaultValue:"default" },
  pt2: { type: "text", defaultValue:"default" },
  st1: { type: "text", defaultValue:"default" },
  st2: { type: "text", defaultValue:"default" },
  rt1: { type: "text", defaultValue:"default" },
  rst1: { type: "text", defaultValue:"default" },
  tt1: { type: "text", defaultValue:"default" },
}
const settingsParam = (route.query.s1 || "32a852,177530,32a852,177530,32a852,2,n,n,1,2,1,1,2").split(",")

const setSettingsFromUrl = (params) => {
  if (params.length !== Object.keys(settingsObj).length) {
    console.error("Wrong params length: ", params.length)
    return
  }
  Object.keys(settingsObj).forEach((item, index) => {
    settingsObj[item] = settingsParam[index] === "n" ? settingsObj[item].defaultValue : settingsParam[index]
  })
}

setSettingsFromUrl(settingsParam)

const instructionText = ref(t(`reveal.instruction.text.${settingsObj.it1}`))
const pulseText1 = t(`reveal.pulse.text1.${settingsObj.pt1}`)
const pulseText2 = t(`reveal.pulse.text2.${settingsObj.pt2}`)
const stepText1 = ref(t(`reveal.step.text1.${settingsObj.st1}`))
const stepText2 = ref(t(`reveal.step.text2.${settingsObj.st2}`))
const resultText = ref(t(`reveal.result.text.${settingsObj.rt1}`))
const resultSubtitleText = ref(t(`reveal.result.subtitleText.${settingsObj.rst1}`))
const thanksText = ref(t(`reveal.thanks.text.${settingsObj.tt1}`))


const colorBoy = `#${settingsObj.c11}`
const colorBoy2 = `#${settingsObj.c12}`
const colorGirl = `#${settingsObj.c21}`
const colorGirl2 = `#${settingsObj.c22}`
const colorMix = `#${settingsObj.c31}`

const basedColors = [
  { colorName: "pink", colorHex: colorGirl, colorsGroup: [colorBoy, colorBoy2]},
  { colorName: "blue", colorHex: colorBoy, colorsGroup: [colorGirl, colorGirl2]},
  { colorName: "purple", colorHex: colorMix},
  { colorName: "purple", colorHex: colorMix}
]

const finalColor = basedColors.filter(elt => {
  const colorToPick = isGirl.value ? "pink": "blue"
  return elt.colorName === colorToPick
})[0]

const canvasLine = ref(null)
const isLineVisible = ref(false)
const lineSize = ref(10)

const step = ref(0)
const stepData = [
  { confettiColors: null },
  { confettiColors: null },
  { confettiColors: [colorGirl] },
  { confettiColors: [colorGirl, colorBoy] },
  { confettiColors: [colorGirl] },
  { confettiColors: [colorBoy] },
  { confettiColors: [colorGirl, colorBoy] },
  { confettiColors: [colorBoy] },
  { confettiColors: [colorGirl, colorBoy] },
  { confettiColors: null },
  { confettiColors: null },
]
const pulseText = ref("")
const pulseCount = ref(10)
const fireCount = ref(0)
const myConfetti = ref(null)
const vibrateDuration = 3 * 1000
let animationEnd = Date.now() + vibrateDuration
const prideDuration = 6 * 1000
let prideAnimationEnd = Date.now() + prideDuration

const downPoint = ref({x: 0, y: 0})
const upPoint = ref({x: 0, y: 0})

const waitTextForNextStep = (duration) => {
  setTimeout(() => {
    step.value++
    if (step.value > 6) {
      pulseText.value = pulseText2
    }
  }, duration);
}

const nextStepPulse = () => {
  if (step.value === 0) {
    step.value = 1
    waitTextForNextStep(6000)
  } else if (step.value > 0 && step.value <= 7) {
    firePulse()
  } else if (step.value > 7 && pulseCount.value > 0) {
    firePulse(pulseCount.value)
  }
}

const randomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const startPulseSnow = () => {
  const pulseElt = document.querySelector(".pulse-container")
  const pulseRect = pulseElt.getBoundingClientRect()

  let centerX = pulseRect.x + pulseRect.width / 2;
  let centerY = pulseRect.y + pulseRect.height / 2;

  const timeLeft = animationEnd - Date.now();
  const ticks = Math.max(200, 500 * (timeLeft / vibrateDuration));
  myConfetti.value({
    particleCount: 1,
    startVelocity: 0,
    ticks,
    origin: { 
      x: (centerX + randomInRange(-(pulseRect.width / 2), pulseRect.width / 2)) / window.innerWidth, 
      y: (centerY + randomInRange(-(pulseRect.height / 2), pulseRect.height / 2)) / window.innerHeight 
    },
    colors: [basedColors[Math.round(randomInRange(0, 3))].colorHex],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4)
  })

  if (timeLeft > 0) {
    requestAnimationFrame(startPulseSnow);
  }
}

const firePulse = (counter) => {
  const pulseElt = document.querySelector(".pulse-container")
  const pulseRect = pulseElt.getBoundingClientRect()

  let centerX = pulseRect.x + pulseRect.width / 2;
  let centerY = pulseRect.y + pulseRect.height / 2;
  
  myConfetti.value({
    particleCount: 50,
    startVelocity: 30,
    spread: counter != null ? 60 : 360,
    angle: counter != null ? (360 * counter / 10 + 90) : 0,
    origin: { x: centerX / window.innerWidth, y: centerY / window.innerHeight },
    colors: [colorGirl, colorBoy]
  })

  if (step.value === 3 || step.value === 6) {
    if (fireCount.value > 0) {
      fireCount.value = 0
      step.value++
      waitTextForNextStep(2000)
    } else {
      fireCount.value++
    }
  } else if (step.value === 8) {
    pulseCount.value--
    if (pulseCount.value === 0) {
      step.value++
      animationEnd = Date.now() + vibrateDuration
      startPulseSnow()
      setTimeout(() => {
        step.value++
        finalFire()
      }, vibrateDuration)
    }
  }
}

const pageClick = (event) => {
  if (step.value >= 11) {
    myConfetti.value({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      angle: 0,
      origin: { x: event.x / window.innerWidth, y: event.y / window.innerHeight },
      colors: finalColor.colorsGroup
    })
  }
}

const startDrawLine = (x, y) => {
  const canvasLine = document.getElementById('line');
  if (canvasLine.getContext) {
    const ctx = canvasLine.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    drawLine(ctx, [x, y], [x, y], 'white', lineSize.value);
  }
  isLineVisible.value = true
  document.getElementById("confetti").addEventListener('touchmove', movingPointer(x,y));
  document.getElementById("confetti").addEventListener('mousemove', movingPointer(x,y));
}

const movingPointer = (x,y) => {
  return (e) => {
    // console.log('mov', e.changedTouches[0].clientX)
    const movingX = e.changedTouches ? e.changedTouches[0].clientX : e.x;
    const movingY = e.changedTouches ? e.changedTouches[0].clientY : e.y;
    if (canvasLine.value.getContext) {
      // values between 0 and 1
      const dx = -(x / window.innerWidth - movingX / window.innerWidth)
      const dy = y / window.innerHeight - movingY / window.innerHeight
      const distance = Math.hypot(dx, dy)

      const ctx = canvasLine.value.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      drawLine(ctx, [x, y], [movingX, movingY], 'white', lineSize.value - distance * lineSize.value);
    }
  }
}

const endDrawLine = () => {
  isLineVisible.value = false
  document.getElementById("confetti").removeEventListener('pointermove', movingPointer);
  document.getElementById("confetti").removeEventListener('touchmove', movingPointer);
}

const finalFire = () => {
  const pulseElt = document.querySelector(".pulse-container")
  const pulseRect = pulseElt.getBoundingClientRect()

  let centerX = pulseRect.x + pulseRect.width / 2;
  let centerY = pulseRect.y + pulseRect.height / 2;

  setTimeout(() => {
    myConfetti.value({
      particleCount: 300,
      startVelocity: 40,
      spread: 360,
      angle: 0,
      origin: { x: centerX / window.innerWidth, y: centerY / window.innerHeight },
      colors: finalColor.colorsGroup
    })
    prideAnimationEnd = Date.now() + prideDuration
    setTimeout(() => {
      prideFire()
      setTimeout(() => {
        step.value++
      }, prideDuration + 500)
    }, 500)
  }, 200)
}

const prideFire = () => {

  myConfetti.value({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: finalColor.colorsGroup
  });
  myConfetti.value({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: finalColor.colorsGroup
  });

  if (Date.now() < prideAnimationEnd) {
    requestAnimationFrame(prideFire);
  }
}

const fire = () => {
  const dx = -(upPoint.value.x - downPoint.value.x)
  const dy = upPoint.value.y - downPoint.value.y
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const distance = Math.hypot(dx, dy)

  console.log('angle:', angle)

  console.log('distance:', distance)

  const firePower = distance*100
  console.log('power', firePower)
  
  myConfetti.value({
    particleCount: 1 + distance*100,
    startVelocity: firePower,
    spread: 55,
    angle: angle,
    origin: { x: downPoint.value.x, y: downPoint.value.y },
    colors: step.value >= 10 ? [finalColor.colorHex] : stepData[step.value].confettiColors
  })

  if (firePower > 15 && step.value === 0) {
    nextStepPulse()
  } else if (firePower > 15 && (step.value === 3 || step.value === 6)) {
    if (fireCount.value > 0) {
      fireCount.value = 0
      step.value++
      waitTextForNextStep(2000)
    } else {
      fireCount.value++
    }
  }
}

const drawLine = (ctx, begin, end, stroke = 'black', width = 1) => {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "black";
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

onMounted(() => {
  canvasLine.value = document.getElementById("line")
  pulseText.value = pulseText1
  const confettiCanvas = document.getElementById("confetti")
  myConfetti.value = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true
  });

  // MOBILE EVENT
  confettiCanvas.addEventListener('touchstart', (event) => {
    console.log('Touch down event', event);
    downPoint.value.x = event.changedTouches[0].clientX / window.innerWidth
    downPoint.value.y = event.changedTouches[0].clientY / window.innerHeight
    startDrawLine(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    event.preventDefault();
  });

  confettiCanvas.addEventListener('touchend', (event) => {
    console.log('Touch up event', event);
    upPoint.value.x = event.changedTouches[0].clientX / window.innerWidth
    upPoint.value.y = event.changedTouches[0].clientY / window.innerHeight
    fire()
    endDrawLine()
    event.preventDefault();
  });

  // MOUSE EVENT
  confettiCanvas.addEventListener('mousedown', (event) => {
    console.log('Mouse down event', event);
    downPoint.value.x = event.x / window.innerWidth
    downPoint.value.y = event.y / window.innerHeight
    startDrawLine(event.x, event.y)
  });

  confettiCanvas.addEventListener('mouseup', (event) => {
    console.log('Mouse up event', event);
    upPoint.value.x = event.x / window.innerWidth
    upPoint.value.y = event.y / window.innerHeight
    fire()
    endDrawLine()
  });

  document.querySelector(".instruction-text").addEventListener('transitionend', () => {
    if (step.value === 2 || step.value === 5) {
      step.value++
    }
  });

  const resizeCanvas = () => {
    canvasLine.value.width = window.innerWidth;
    canvasLine.value.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas, false);
})


defineExpose({
  nextStepPulse,
  fire,
  pageClick
})
</script>

<template>
<div class="reveal-container relative h-full w-full flex justify-center items-center overflow-hidden" :class="`reveal-container-${step}`" @click="pageClick($event)">
    <!-- CONFETTI CANVAS -->
    <canvas class="absolute w-full h-full z-10" id="confetti"></canvas>
    <!-- LINE CANVAS -->
    <canvas v-show="isLineVisible && step < 11" class="absolute w-full h-full z-0" id="line"></canvas>

    <!-- PULSE -->
    <div class="pulse-container relative" :class="[{'pulse-container-aside': step > 0 && step < 8}, {'pulse-container-girl': route.params.isGirlForm != null && route.params.isGirlForm === 'true'}, {'pulse-container-boy': route.params.isGirlForm != null && route.params.isGirlForm === 'false'}, {'pulse-container-charging': step === 9}, {'pulse-container-expanding': step >= 10}, step >= 10 || isLineVisible ? 'z-0': 'z-10']">
      <Pulse @click="nextStepPulse()" :text="pulseText" />
    </div>

    <!-- TEXTS -->
    <p class="instruction-text dancing-script w-11/12 absolute top-1/2 left-1/2 opacity-0 transition-all ease-in-out z-0 text-2xl sm:text-4xl lg:text-6xl text-center" :class="[ {'opacity-100': step === 1 || step === 4 || step === 7}]">
      <span v-if="step < 3">Tire sur l'écran pour découvrir le genre de notre bébé...</span>
      <span class="text-4xl lg:text-6xl" v-if="step >= 3 && step < 6">Est-ce une fille ?</span>
      <span class="text-4xl lg:text-6xl" v-if="step >= 6 && step < 9">ou un garçon ?</span>
    </p>
    <p class="final-text dancing-script font-bold w-11/12 absolute top-1/2 left-1/2 opacity-0 transition-all delay-200 text-2xl sm:text-4xl lg:text-6xl text-center" :class=" {'opacity-100 text-xl lg:text-6xl': step >= 10}">
      <span>
        C'est une fille !<br>
        <span class="text-xl lg:text-3xl font-normal transition duration-1000 delay-200 opacity-0" :class="{'opacity-100': step < 11}">Une future padawan ❤️</span>
      </span>
    </p>
    <!-- THANKS -->
    <div class="thanks-container opacity-0 w-11/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all text-center flex flex-col justify-center items-center" :class="step >= 11 ? 'opacity-100 z-10' : 'z-0'">
      <h1 class="mb-8 text-lg lg:text-4xl font-bold">Nous vous remercions !</h1>
      <h2 class="mt-2 mb-2 text-md lg:text-lg">Nous vous transmettrons bientôt notre liste de naissance 🎁</h2>
      <p class="text-md italic">A très vite !</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reveal-container {
  .afc-logo {
    width: 250px;
  }
  
  .instruction-text {
    transition-duration: 2s;
  }
  .final-text {
    transition-duration: 1s;
    transform: translate(-50%, -50%);
  }
  .thanks-container {
    transition-duration: 1s;
    transition-delay: 1s;
  }

  &-0 {
    .instruction-text {
      transform: translate(-50%, -100%);
    }
  }

  &-1 {
    .instruction-text {
      transition-delay: 1s;
      transform: translate(-50%, -50%);
    }
  }
  &-2 {
    .instruction-text {
      transform: translate(-50%, 0%);
    }
  }
  &-3 {
    .instruction-text {
      transform: translate(-50%, -100%);
    }
  }
  &-4 {
    .instruction-text {
      transform: translate(-50%, -50%);
    }
  }
  &-5 {
    .instruction-text {
      transform: translate(-50%, 0%);
    }
  }
  &-6 {
    .instruction-text {
      transform: translate(-50%, -100%);
    }
  }
  &-7 {
    .instruction-text {
      transform: translate(-50%, -50%);
    }
  }
  &-8 {
    .instruction-text {
      transform: translate(-50%, 0%);
    }
  }
  &-10 {
    .final-text {
      transition-duration: 1s;
      transition-timing-function: cubic-bezier(.42,.01,.42,1.41);
    }
  }
  &-11 {
    .final-text {
      transition-timing-function: ease-in-out;
      transform: translate(-50%, calc(-50vh + 20%));
      @media screen and (max-width: 768px) {
        transform: translate(-50%, calc(-50vh + 90%));
      }
    }
  }
}
.pulse-container {
  width: 280px;
  height: 280px;
  transition: all 2s ease-in-out;
  font-family: 'Dancing Script', cursive, Verdana ;
  font-size: 2em;
  :deep(.circle-content) {
    transition: opacity 1s ease-in-out, font-size 2s ease-in-out;
  }

  &-aside {
    width: 150px;
    height: 150px;
    transform: translateX(calc(-50vw + 100%)) translateY(calc(-50vh + 100%));
    @media screen and (max-width: 768px) {
      transform: translateY(calc(-50vw - 30%));
    }
    :deep(.circle-content) {
      opacity: 0;
      font-size: 3px;
    }
  }

  &-girl {
    :deep(.pulse-2) {
      border-color: #dc8ec2;
    }
  }
  &-boy {
    :deep(.pulse-2) {
      border-color: #78ade0;
    }
  }

  &-charging {
    width: 100px;
    height: 100px;
    animation-name: vibrate;
    animation-duration: 0.1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
    :deep(.circle-content) {
      opacity: 0;
    }
  }

  &-expanding {
    transition: all 0.3s cubic-bezier(.42,-0.06,.61,-0.43);
    width: 1000px;
    height: 1000px;
    opacity: 0;
  }
}

.thanks-container {
  .twitter-link {
    width: 25px;
  }
  .instagram-link {
    width: 50px;
  }
  
  @media screen and (max-width: 400px) and (max-height: 700px) {
    transform: translateX(-50%) translateY(-45%) scale(0.8) ;
  }
}
@keyframes vibrate {
  from {transform: translateX(0px);}
  to {transform: translateX(20px);}
}
</style>