<template>
  <div>
    <div id="app">
      <select v-model="selected">
        <option
          v-for="(option, idx) in options"
          v-bind:value="option.value"
          :key="idx"
        >
          {{ option.text }}
        </option>
      </select>

      <svg viewBox="0 0 400 400">
        <!--xaxis -->
        <g targetVal="targetVal" class="xaxis">
          <line x1="0" y1="1" x2="350" y2="1" />
          <g v-for="(select, index) in targetVal" :key="index">
            <line y1="0" y2="7" v-bind="{ x1: index * 10, x2: index * 10 }" />
            <text v-if="index % 5 === 0" v-bind="{ x: index * 10, y: 20 }">
              {{ index }}
            </text>
          </g>
        </g>

        <!--yaxis -->
        <g class="yaxis">
          <line x1="0" y1="1" :x2="getMax" y2="1" />
          <g v-for="(n, idx) in getMaxRange" :key="idx">
            <line y1="0" y2="7" v-bind="{ x1: n * 10, x2: n * 10 }" />
            <text v-if="n % 5 === 0" v-bind="{ x: getMax - n * 10 - 5, y: 20 }">
              {{ n }}
            </text>
          </g>
        </g>

        <!-- bars -->
        <g v-for="(select, index) in targetVal" class="bars" :key="index">
          <rect
            v-bind="{ x: index * 10 + 20, y: getMax - select * 10 }"
            width="10"
            :height="select * 10"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { TweenMax } from "gsap"; //tiene que ser la version 1.19, mas nuevas no

export default {
  layout: "default",
  data() {
    return {
      selected: [
        25, 37, 15, 13, 25, 30, 11, 17, 35, 10, 25, 15, 5, 27, 15, 13, 25, 36,
        15, 14, 35, 10, 14, 15, 35, 17, 12, 13, 25, 30, 14, 17, 35, 10, 25, 15,
      ],
      targetVal: [
        25, 37, 15, 13, 25, 30, 11, 17, 35, 10, 25, 15, 5, 27, 15, 13, 25, 36,
        15, 14, 35, 10, 14, 15, 35, 17, 12, 13, 25, 30, 14, 17, 35, 10, 25, 15,
      ],
      options: [
        {
          text: "First Dataset",
          value: [
            25, 37, 15, 13, 25, 30, 11, 17, 35, 10, 25, 15, 5, 27, 15, 13, 25,
            36, 15, 14, 35, 10, 14, 15, 35, 17, 12, 13, 25, 30, 14, 17, 35, 10,
            25, 15,
          ],
        },
        {
          text: "Second Dataset",
          value: [
            13, 25, 30, 11, 17, 35, 10, 25, 15, 5, 27, 15, 13, 25, 36, 15, 14,
            35, 10, 14, 15, 35, 17, 12, 13, 25, 30, 14, 17, 35, 10, 25, 15, 25,
            37, 15,
          ],
        },
        {
          text: "Third Dataset",
          value: [
            35, 10, 25, 15, 5, 27, 15, 13, 25, 36, 15, 14, 35, 10, 14, 15, 35,
            17, 12, 13, 25, 30, 14, 17, 35, 10, 25, 15, 25, 37, 15, 13, 25, 30,
            11, 17,
          ],
        },
      ],
    };
  },

  computed: {
    getMax() {
      return Math.max.apply(Math, this.selected) * 10;
    },
    getMaxRange() {
      const maxi = Math.max.apply(Math, this.selected);
      return _.range(maxi);
    },
  },
  watch: {
    selected(newValue, oldValue) {
      //console.warn(newValue, oldValue);

      // Create a dummy object that will get updated by GSAP
      const tweenedData = {};
      //console.log("1: ", tweenedData);
      // Update function that is invoked on each tween step
      // we use this to push the data
      const update = function () {
        const obj = Object.values(tweenedData);
        obj.pop();
        this.targetVal = obj;
        //console.log("2: ", tweenedData);
      };

      // Create an object to hold the source data to be tweened and the
      // function pointer for update events
      const tweenSourceData = { onUpdate: update, onUpdateScope: this };
      let key;
      for (let i = 0; i < oldValue.length; i++) {
        // Turn the current index into a string
        key = i.toString();
        tweenedData[key] = oldValue[i];
        tweenSourceData[key] = newValue[i];
        //console.log("3: ", tweenedData);
      }

      // Tween over the our target dummy object, but only for the specific key
      TweenMax.to(tweenedData, 1, tweenSourceData); ///esto es lo que hace correr a la funcion UPDATE, es propio de la libreria gsap
    },
  },

  mounted() {
    /*
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"
    );
    document.head.appendChild(recaptchaScript);
    */
  },
};
</script>

<style scoped lang="scss">
@use "sass:math";
@import "./configuraciones.scss";
body {
  font-family: "Mada", sans-serif;
  background: $background;
}

#app {
  text-align: center;
  max-width: 400px;
  margin: 30px auto;
  display: table;
  background: $background;
}

span {
  color: white;
}

svg {
  width: 400px;
  text {
    fill: grey;
    font-family: "Mada", sans-serif;
  }
}

line {
  stroke: #555;
  stroke-width: 2px;
}

select {
  font-family: "Mada", sans-serif;
  background: #444;
  color: #ccc;
  border: 0;
  width: 200px;
  margin: 0 0 25px;
  outline: 0;
  cursor: pointer;
  height: 35px;
  option {
    font-family: "Mada", sans-serif;
  }
}

.xaxis {
  transform: translate(20px, 370px);
}

.yaxis {
  transform: translate(20px, 0px) rotate(90deg);
}

$amt: 350px;
$max: 40;
$color: math.div(300, $max);

@for $i from 1 through $max {
  .bars:nth-child(#{$i}) rect {
    fill: hsl(($i - 10) * ($color * 1.25), ($i - 1) * $color * 1%, 40%);
  }
}
</style>
