<template>
  <div class="view__change">
    <div class="view__btn" :class="{'_active': !value}" @click="$emit('input', false)">
      <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m512 148h-324v-148h324zm-284-40h244v-68h-244zm284 404h-324v-148h324zm-284-40h244v-68h-244zm284-142h-324v-148h324zm-284-40h244v-68h-244zm-80-142h-148v-148h148zm-108-40h68v-68h-68zm108 404h-148v-148h148zm-108-40h68v-68h-68zm108-142h-148v-148h148zm-108-40h68v-68h-68zm0 0"
        ></path>
      </svg>
    </div>
    <div class="view__btn" :class="{'_active': value}" @click="$emit('input', true)">
      <svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m512 144h-144v-144h144zm-104-40h64v-64h-64zm104 408h-144v-144h144zm-104-40h64v-64h-64zm104-144h-144v-144h144zm-104-40h64v-64h-64zm-264-144h-144v-144h144zm-104-40h64v-64h-64zm104 408h-144v-144h144zm-104-40h64v-64h-64zm104-144h-144v-144h144zm-104-40h64v-64h-64zm288-144h-144v-144h144zm-104-40h64v-64h-64zm104 408h-144v-144h144zm-104-40h64v-64h-64zm104-144h-144v-144h144zm-104-40h64v-64h-64zm0 0"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style>
.view__change {
  display: flex;
  margin-right: 0;
  margin-left: auto;
}

.view__btn {
  cursor: pointer;
}

.view__btn:first-child {
  margin-right: 25px;
}

.view__btn svg {
  display: block;
  position: relative;
  width: 20px;
  height: 20px;
  fill: darkgray;
}

.view__btn._active svg {
  fill: rgba(61, 183, 255, 1);
}
</style>
