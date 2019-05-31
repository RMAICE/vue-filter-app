<template>
  <div class="filter">
    <Range v-model="val" :connector="connector" ref="range"/>
    <Select v-model="brand" class="filter__brand" :options="options"/>
    <Features v-model="featuresList" @filterReset="resetFilter"/>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import Range from "./Range";
import Select from "./Select";
import Features from "./Features";

export default {
  name: "ListFilter",
  components: {
    Range,
    Select,
    Features
  },
  props: ["value", "minMax", "connector"],
  data() {
    return {
      val: this.minMax,
      items: this.value,
      featuresList: [],
      brand: "",
      options: []
    };
  },
  methods: {
    resetFilter() {
      this.brand = "";
      this.featuresList.forEach(item => (item.active = false));
      this.$refs.range.resetVal(this.minMax);
      this.getItemsWithFilter();
    },
    checker(arr, target) {
      return target.every(item => arr.includes(item));
    },
    getItemsWithFilter: _.debounce(function() {
      const mapped = [...this.items];
      const activeFeatures = this.featuresList.filter(item => item.active);
      const mappedActiveFeatures = activeFeatures.map(item => item.name);

      const result = mapped.filter(value => {
        let priceCondition =
          value.price >= this.val[0] && value.price <= this.val[1];
        let brandCondition = value.brand.includes(this.brand);
        let featureCondition = this.checker(
          value.features,
          mappedActiveFeatures
        );

        return priceCondition && brandCondition && featureCondition;
      });

      this.$emit("pageReset");
      this.$emit("input", result);
    }, 800)
  },
  watch: {
    val() {
      this.getItemsWithFilter();
    },
    brand() {
      this.getItemsWithFilter();
    },
    featuresList() {
      this.getItemsWithFilter();
    }
  },
  created() {
    let featuresSet = new Set();
    let optionsSet = new Set(
      this.items.map(item => {
        item.features.map(feature => featuresSet.add(feature));
        return item.brand;
      })
    );
    let options = [...optionsSet].map(value => ({
      name: value,
      searchBy: value
    }));
    let features = [...featuresSet].map(value => ({
      name: value,
      active: false
    }));

    this.featuresList = [...features];
    this.options = [{ name: "Все", searchBy: "", active: false }, ...options];
  },
  mounted() {
    this.connector.$emit("setFeatures", this.featuresList);
  }
};
</script>

<style>
.filter {
  display: flex;
  width: 1250px;
  height: 200px;
  padding: 68px 100px 0;
  margin: 0 auto 50px;
  box-sizing: border-box;
  border-radius: 10px;
  background: linear-gradient(-80deg, #3db7ff, #404bff);
}

.filter__note {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 0;
  color: #fff;
}

.filter__brand {
  position: relative;
  box-sizing: border-box;
  width: 201px;
  height: 60px;
  background-color: #fff;
  border-radius: 5px;
  text-align: left;
}
</style>
