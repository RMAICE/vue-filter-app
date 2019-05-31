<template>
  <div class="filter__features">
    <button
      type="button"
      class="filter__features-btn"
      v-for="(feature, ndx) in featureList"
      :key="feature.name"
      @click="toggleFeature(feature, ndx)"
      :class="{active: feature.active}"
    >{{feature.name}}</button>
    <button class="filter__reset-btn" @click="$emit('filterReset')" type="button">Сбросить фильтр</button>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      featureList: [...this.value]
    };
  },
  methods: {
    toggleFeature(feature, featureIndex) {
      let newFeatureList = [...this.featureList];

      newFeatureList[featureIndex].active = !feature.active;

      this.$emit("input", newFeatureList);
    }
  }
};
</script>

<style>
.filter__features {
  position: relative;
  margin-right: 0;
  margin-left: auto;
}

.filter__features-btn {
  margin-left: 60px;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  background-color: transparent;
  border: 1px solid #fff;
  color: #ffffff;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s;
  cursor: pointer;
}

.filter__features-btn:hover,
.filter__features-btn.active {
  background-color: #fff;
  color: #000000;
}

.filter__reset-btn {
  position: absolute;
  right: 0;
  bottom: 30px;
  display: block;
  background-color: transparent;
  border: 0;
  color: #ffffff;
  text-decoration: underline;
  outline: none;
  transition: all 0.3s;
  cursor: pointer;
}

.filter__reset-btn:hover {
  opacity: 0.5;
}
</style>
