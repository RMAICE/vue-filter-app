<template>
  <main class="main" v-if="this.items.length > 0">
    <ListFilter
      v-model="actualItems"
      ref="filter"
      :page="page"
      :connector="connector"
      @pageReset="page = 1"
      :minMax="maxMinVal"
    />
    <div class="view">
      <div v-if="!tile" class="view__wrapper">
        <div
          class="view__param"
          v-for="(item, i) in params"
          :class="{'_name': i === 0}"
          :key="i"
        >{{ item }}</div>
      </div>
      <ChangeView v-model="tile"></ChangeView>
    </div>
    <ul class="list" :class="{'_tile': tile}">
      <ListItem
        class="list__item"
        :featuresList="features"
        v-for="(item, i) in itemView"
        :key="i"
        v-bind="{...item}"
      />
    </ul>
    <button
      class="btn-more"
      v-if="loadCount > 0"
      @click="load"
    >Загрузить еще {{ loadCount }} из {{ actualItems.length }}</button>
  </main>
</template>

<script>
import Vue from "vue";
import ChangeView from "./ChangeView";
import ListFilter from "./ListFilter";
import ListItem from "./ListItem";
import axios from "axios";

export default {
  components: {
    ListFilter,
    ListItem,
    ChangeView
  },
  data() {
    return {
      params: [
        "Название",
        "Производители",
        "Диагональ",
        "Технология",
        "Разрешение",
        "Цена"
      ],
      connector: new Vue(),
      items: [],
      actualItems: [],
      features: [],
      page: 1,
      tile: false
    };
  },
  computed: {
    loadCount() {
      let itemsDelta = this.actualItems.length - this.itemView.length;

      return itemsDelta > 30 ? 30 : itemsDelta;
    },
    itemView() {
      return this.actualItems.slice(0, 30 * this.page);
    },
    maxMinVal() {
      return this.getMaxMinArr();
    }
  },
  methods: {
    getMaxMinArr() {
      let min = this.items[0].price;
      let max = this.items[0].price;

      for (let item of this.items) {
        min = item.price < min ? item.price : min;
        max = item.price > max ? item.price : max;
      }

      return [min, max];
    },
    load() {
      this.page += 1;
    }
  },
  async created() {
    try {
      let items = await axios.get("/static/screens.json");

      this.items = this.actualItems = items.data;
    } catch (e) {
      throw e;
    }
  },
  mounted() {
    this.connector.$on("setFeatures", val => {
      this.features = val;
    });
  }
};
</script>
<style>
.list {
  display: flex;
  flex-wrap: wrap;
  width: 1250px;
  margin: 0 auto;
  padding-left: 0;
}

.btn-more {
  display: block;
  padding: 25px 45px;
  margin: 0 auto;
  background-color: rgba(61, 183, 255, 1);
  color: #ffffff;
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
}

.btn-more:hover {
  background-color: rgba(61, 183, 255, 0.7);
}

.view {
  box-sizing: border-box;
  display: flex;
  width: 1250px;
  margin: 0 auto 15px;
  padding-left: 215px;
}

.view__wrapper {
  display: flex;
}

.view__param {
  width: 120px;
  margin-right: 10px;
  text-align: left;
}
.view__param._name {
  width: 150px;
}
</style>
