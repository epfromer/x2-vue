import { createLocalVue, shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";

describe("HelloWorld.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);
  localVue.use(Vuetify);

  const vuetify = new Vuetify({
    icons: {
      iconfont: "mdi"
    }
  });

  const router = new VueRouter({
    routes: []
  });

  const store = new Vuex.Store({
    state: {}
  });

  function doMount(mountType) {
    return mountType(HelloWorld, {
      localVue,
      vuetify,
      store,
      router
    });
  }

  it("isVueInstance", () => {
    const tree = doMount(shallowMount);
    expect(tree.isVueInstance()).toBeTruthy();
  });

  it("toMatchSnapshot", () => {
    const tree = doMount(shallowMount);
    expect(tree.element).toMatchSnapshot();
  });

  // it("renders props.msg when passed", () => {
  //   const msg = "new message";
  //   const wrapper = shallowMount(HelloWorld, {
  //     propsData: { msg }
  //   });
  //   expect(wrapper.text()).toMatch(msg);
  // });
});
