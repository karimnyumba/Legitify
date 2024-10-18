import { expect, test, it } from "vitest";
import "@testing-library/vue";
import App from "../views/dashboard.vue";
import { render, screen } from "@testing-library/vue";

test("Prove the vitest works with vue", async () => {
  expect(2 + 3).toBe(5);
});

// test ("render the app ", ()=>{

//   render (<App/>)
// })

// describe("Institution", () => {
//   it("renders a message and responds correctly to user input", () => {
//     const wrapper = shallowMount(Foo, {
//       data() {
//         return {
//           message: "Rendered correctly",
//           username: "",
//         };
//       },
//     });

//     // see if the message renders
//     expect(wrapper.find(".message").text()).toEqual("Hello World");

//     // assert the error is rendered
//     expect(wrapper.find(".error").exists()).toBeTruthy();

//     // update the `username` and assert error is no longer rendered
//     wrapper.setData({ username: "Lachlan" });
//     expect(wrapper.find(".error").exists()).toBeFalsy();
//   });
// });
