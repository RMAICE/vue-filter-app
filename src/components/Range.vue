<template>
  <div class="filter__price">
    <div class="filter__note">Цена</div>
    <input class="filter__price-input" type="text" :value="minVal" @input="changeVal(0, $event)">
    <input class="filter__price-input" type="text" :value="maxVal" @input="changeVal(1, $event)">
    <div class="filter__slider-wrapper">
      <vue-slider
        v-model="val"
        ref="slider"
        :min="min"
        :max="max"
        :class="['filter__slider']"
        :duration="0.1"
        :contained="true"
        :enable-cross="false"
        :processStyle="{ 'background-color': '#fff' }"
        :tooltip="'none'"
        :height="2"
        :dotSize="[20, 20]"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import VueSlider from "vue-slider-component";

export default {
  components: {
    VueSlider
  },
  props: ["value", "connector"],
  data() {
    return {
      val: this.value,
      min: this.value[0],
      max: this.value[1]
    };
  },
  computed: {
    minVal: {
      get() {
        return this.val[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      set(newMin) {
        this.val[0] = newMin;
      }
    },
    maxVal: {
      get() {
        return this.val[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },
      set(newMax) {
        this.val[1] = newMax;
      }
    }
  },
  watch: {
    val(newVal) {
      this.val[0] =
        newVal[0] < this.min || newVal[0] >= this.max ? this.min : newVal[0];
      this.val[1] =
        newVal[1] <= this.min || newVal[1] > this.max ? this.max : newVal[1];

      this.$emit("input", this.val);
    }
  },
  methods: {
    resetVal(minMax) {
      this.$refs.slider.setValue(minMax);
    },
    changeVal: _.debounce(function(ndx, event) {
      let newValue = [...this.val];
      let inputVal = parseInt(event.target.value);

      newValue[ndx] = isNaN(inputVal) ? 0 : inputVal;

      this.val = newValue;
    }, 1000)
  }
};
</script>

<style src="vue-slider-component/theme/default.css"></style>

<style>
.filter__price {
  position: relative;
  display: flex;
  justify-content: space-around;
  width: 231px;
  height: 60px;
  margin-right: 50px;
  background-color: #fff;
  border-radius: 5px;
}

.filter__price-input {
  display: block;
  width: 80px;
  font-size: 22px;
  border: 0;
  text-align: center;
  outline: none;
}

.filter__slider-wrapper {
  position: absolute;
  top: calc(100% + 9px);
  width: 100%;
}

.filter__slider-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: #fff;
}

.filter__slider-dot::after,
.filter__slider-dot::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 10px;
  height: 1px;
  background-color: #000;
}

.filter__slider-dot::after {
  top: auto;
  bottom: 8px;
}
</style>
