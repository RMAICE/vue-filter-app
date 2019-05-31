<template>
  <div class="select">
    <div class="filter__note">Производитель</div>
    <span class="select__value" @click="toggleOptions">{{ val }}</span>
    <div class="select__caret" :class="{ active: listActive}"></div>
    <div class="select__options" :class="{ active: listActive}">
      <div
        class="select__item"
        v-for="(item, i) in options"
        :key="i"
        @click="selectOption(item.searchBy)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "options"],
  data() {
    return {
      listActive: false
    };
  },
  computed: {
    val() {
      return this.value.trim() !== "" ? this.value.trim() : "Выберите";
    }
  },
  methods: {
    toggleOptions() {
      this.listActive = !this.listActive;
    },
    selectOption(newVal) {
      this.$emit("input", newVal);
      this.listActive = false;
    }
  }
};
</script>

<style lang="css" scoped>
.select {
  position: relative;
  display: flex;
  align-items: center;
}

.select__value {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  width: 100%;
  line-height: 60px;
  padding-right: 65px;
  padding-left: 26px;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.select__caret {
  position: absolute;
  right: 30px;
  width: 10px;
  height: 10px;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
  transform: rotate(45deg);
  transition: all 0.3s;
  pointer-events: none;
  cursor: pointer;
}

.select__caret.active {
  transform: rotate(225deg);
}

.select__options {
  position: absolute;
  overflow: hidden;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  transform: translateY(10px);
  opacity: 0;
  z-index: 100;
  visibility: hidden;
  transition: all 0.3s;
}

.select__options.active {
  transform: translateY(0px);
  opacity: 1;
  visibility: visible;
}

.select__item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding-left: 26px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-right: 65px solid #fff;
  background-color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}

.select__item:hover {
  background-color: #3db7ff;
  border-color: #3db7ff;
}
</style>
