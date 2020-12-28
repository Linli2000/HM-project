<template>
  <div>
    <h1>添加用户关注的测试页面</h1>
    <button @click="addFollow(1)">添加关注用户1</button>
    <button @click="addFollow(2)">添加关注用户2</button>
    <button @click="addFollow(3)">添加关注用户3</button>
    <button @click="addFollow(4)">添加关注用户4</button>
    <button @click="addFollow(5)">添加关注用户5</button>
    <button @click="addFollow(6)">添加关注用户6</button>
  </div>
</template>

<script>
import { addUserFollowsById } from "@/api";
export default {
  methods: {
    addFollow (id) {
      addUserFollowsById(id).then((res) => {
        console.log("addUserFollowsById", res.data.message);
      });
    },
  },
};
</script>