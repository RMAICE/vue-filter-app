<template>
  <li>
    <div class="list__item-image">
      <img :src="image" alt>
    </div>
    <div class="list__item-text _name">
      <span>{{name}}</span>
    </div>
    <div class="list__item-text">
      <span>{{brand}}</span>
    </div>
    <div class="list__item-text">
      <span>{{size}}</span>
    </div>
    <div class="list__item-text">
      <span>{{tech}}</span>
    </div>
    <div class="list__item-text">
      <span>{{res}}</span>
    </div>
    <div class="list__item-text">
      <span>{{cost}}</span>
    </div>
    <div class="list__features-list">
      <div
        class="list__features-item"
        v-for="(feature, i) in featuresList"
        :class="{'_active': featureCondition(feature.name, features)}"
        :key="i"
      >
        <svg :viewBox="icon[feature.name][0]" xmlns="http://www.w3.org/2000/svg">
          <path v-for="(item, i) in icon[feature.name]" :key="i" :d="icon[feature.name][i+1]"></path>
        </svg>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "image",
    "name",
    "brand",
    "size",
    "tech",
    "res",
    "price",
    "features",
    "featuresList"
  ],
  data() {
    return {
      icon: {
        "Изогнутый экран": [
          "0 -65 448 448",
          "m421.816406 3.625c-131.257812 18.101562-264.375 18.101562-395.632812 0l-26.183594-3.625v237.648438l26.183594-3.625c52.328125-7.203126 105.011718-11.515626 157.816406-12.910157v-.113281l7.824219-.175781c10.671875-.230469 21.421875-.351563 32.175781-.351563s21.496094.121094 32.175781.351563l7.824219.175781v.113281c52.804688 1.394531 105.492188 5.707031 157.824219 12.910157l26.175781 3.625v-237.648438zm0 0",
          "m248 236.734375c-2.105469 0-4.207031 0-6.320312-.070313-11.777344-.144531-23.582032-.144531-35.359376 0-2.105468 0-4.214843.039063-6.320312.070313v66.089844h-72v16h192v-16h-72zm0 0"
        ],
        "Поддержка 3Д": [
          "0 -13 511.99989 511",
          "m352 346.496094c-5.523438 0-10 4.480468-10 10 0 5.519531 4.476562 10 10 10 5.519531 0 10-4.480469 10-10 0-5.519532-4.480469-10-10-10zm0 0",
          "m266 170.5c0-5.523438-4.480469-10-10-10s-10 4.476562-10 10c0 5.519531 4.480469 10 10 10s10-4.480469 10-10zm0 0",
          "m160 366.496094c5.519531 0 10-4.480469 10-10 0-5.519532-4.480469-10-10-10s-10 4.480468-10 10c0 5.519531 4.480469 10 10 10zm0 0",
          "m506.058594 414.015625-54.0625-24.019531v-219.496094c0-3.960938-2.371094-7.628906-6.140625-9.230469l-179.855469-77.355469v-73.414062c0-5.523438-4.480469-10-10-10-5.523438 0-10 4.476562-10 10v73.414062l-179.855469 77.355469c-3.574219 1.484375-6.140625 5.105469-6.140625 9.230469v219.496094l-54.0625 24.019531c-5.046875 2.246094-7.320312 8.152344-5.078125 13.199219 2.226563 5.015625 8.117188 7.335937 13.199219 5.078125l56.003906-24.882813 181.984375 78.269532c2.40625 1.035156 5.347657 1.097656 7.902344 0l181.980469-78.269532 56.003906 24.882813c5.101562 2.265625 10.980469-.082031 13.199219-5.078125 2.242187-5.046875-.03125-10.953125-5.078125-13.199219zm-260.058594-308.328125v24.8125c0 5.519531 4.476562 10 10 10 5.519531 0 10-4.480469 10-10v-24.8125l150.6875 64.8125-160.6875 69.113281-160.6875-69.113281zm-113.410156 262.996094c-2.246094-5.046875-8.15625-7.316406-13.199219-5.078125l-39.390625 17.503906v-195.425781l166 71.398437v204.226563l-151.035156-64.960938 32.546875-14.460937c5.046875-2.246094 7.320312-8.15625 5.078125-13.203125zm133.410156 92.625v-204.226563l165.996094-71.398437v195.425781l-39.386719-17.5c-5.050781-2.242187-10.957031.027344-13.199219 5.078125-2.242187 5.046875.03125 10.953125 5.078125 13.199219l32.546875 14.460937zm0 0"
        ]
      }
    };
  },
  methods: {
    featureCondition(feature, features) {
      return features.indexOf(feature) >= 0;
    }
  },
  computed: {
    cost() {
      let str = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

      return str + " руб.";
    }
  }
};
</script>

<style>
.list__item {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 25px;
  margin-bottom: 25px;
  height: 170px;
  box-shadow: 0px 5px 15px -10px rgb(160, 160, 160);
  border-radius: 10px;
}
._tile .list__item {
  flex-direction: column;
  width: calc(calc(100% / 3) - calc(50px / 3));
  margin-right: 25px;
  height: 600px;
}
._tile .list__item:nth-child(3n) {
  margin-right: 0;
}
.list__item-image {
  position: relative;
  overflow: hidden;
  width: 150px;
  margin-right: 40px;
}
._tile .list__item-image {
  margin-right: 0;
  margin-bottom: 25px;
  width: 100%;
  height: 200px;
}
.list__item-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}
.list__item-text._name {
  width: 150px;
}
.list__features-list {
  display: flex;
  align-items: center;
}
.list__features-item {
  width: 25px;
}
.list__features-item:first-child {
  margin-right: 50px;
}
.list__features-item svg {
  width: 100%;
  fill: darkgray;
}
.list__features-item._active svg {
  width: 100%;
  fill: rgba(61, 183, 255, 1);
}
.list__item-text {
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 120px;
  text-align: left;
}
._tile .list__item-text {
  margin-bottom: 25px;
  width: 100%;
}
._tile .list__item-text:last-child {
  margin-bottom: 0;
}
</style>
