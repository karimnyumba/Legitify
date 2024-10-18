import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import { ethers } from "ethers";
import { abi, contractAddress } from "../../../../LegitifyConstants";
import swal from "sweetalert2";
import {
  notifyError,
  notifySuccess,
  notifyWarning,
} from "@/services/notificationService";
import { getSignerContract } from "@/interfaces/global.interface";

// VuexPersistence configuration
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    logeInUser: state.logeInUser, // Persisting only the logeInUser state
  }),
});

export const UserStore = {
  state: {
    allUsers: [],
    logeInUser: {},
  },
  getters: {
    getAllUsers(state) {
      return state.allUsers;
    },
    getCurrentUser(state) {
      return state.logeInUser;
    },
  },
  mutations: {
    addUser(state, user) {
      state.allUsers.push(user);
    },
    setAllUsers(state, users) {
      state.allUsers = users?.map((user) => ({
        name: user?.name,
        organization: user?.organisation,
        position: user?.position,
        userAddress: user?.userAddress,
      }));
    },
    setCurrentLogedInUser(state, user) {
      const logedUser = {
        user_Addres: user?.userAddres,
        user_Type: user?.userType,
        name: user.name ? user.name : user.orgName,
        org_Name: user?.orgName,
      };
      state.logeInUser = logedUser;
    },
    clearUsers(state) {
      state.allUsers = [];
    },
  },
  actions: {
    clearUsers({ commit }) {
      commit("clearUsers");
    },
    async loginUser({ commit }, contentData) {
      try {
        const user = contentData.user;
        commit("setCurrentLogedInUser", user);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllUsers({ commit }, params) {
      try {
        const signerContract = await getSignerContract();
        const users = await signerContract.contract.getOperators(
          params.organisationName
        );
        commit("setAllUsers", users);
      } catch (error) {}
    },
    async addUser({ commit }, userData) {
      const { contract, signer } = await getSignerContract();
      const isAvailable = await contract.isAvailable(userData.userWallet);

      if (!isAvailable) {
        const organization = await contract.testingAddress(
          await signer.getAddress()
        );
        try {
          const response = await contract.addOperator(
            userData.userName,
            organization.orgName,
            userData.userWallet,
            userData.userPosition
          );
          if (response.hash) {
            commit("addUser", {
              name: userData.userName,
              userAddress: userData.userWallet,
              position: userData.userPosition,
            });
            notifySuccess("Added user successfully!");
          }
        } catch (error) {
          notifyError("Failed to save user!");
        }
      } else {
        notifyWarning(`Address ${userData.userWallet} already exists!`);
      }
    },
  },
  plugins: [vuexLocal.plugin],
};
