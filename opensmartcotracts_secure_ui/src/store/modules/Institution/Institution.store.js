import { createStore } from "vuex";
import { ethers } from "ethers";
import { abi, contractAddress } from "../../../../LegitifyConstants";
import swal from "sweetalert2";
import { notifyError } from "@/services/notificationService";

export const InstitutionStore = {
  state: {
    allOrganizations: [],
  },
  getters: {
    getAllOrganizations(state) {
      return state.allOrganizations;
    },
  },
  mutations: {
    addOrganization(state, organization) {
      state.allOrganizations.push({ ...organization });
    },
    setAllOrganizations(state, organizations) {
      organizations.forEach((org) => {
        console.log(org);
        state.allOrganizations.push({
          officeLocation: org.location,
          orgAddress: org.orgAddress,
          orgName: org.orgName,
        });
      });
    },
    clearOrganizations(state) {
      state.allOrganizations = [];
    },
  },
  actions: {
    async fetchAllOrganizations(context) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let allOrganizations = await contract.getOrganization();
      context.commit("setAllOrganizations", allOrganizations);
    },
    async addOrganization(context, institutionData) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      let result = await contract.isAvailable(
        institutionData.institutionAddress
      );

      if (!result) {
        try {
          const transactionResponse = await contract.addOrganization(
            institutionData.institutionName,
            institutionData.institutionAddress,
            institutionData.institutionLocation
          );
          if (transactionResponse.hash) {
            context.commit("addOrganization", {
              officeLocation: institutionData.institutionLocation,
              orgAddress: institutionData.institutionAddress,
              orgName: institutionData.institutionName,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        await notifyError(
          "An institution with same address is already registered!"
        );
      }
    },
    clearOrganizations(context) {
      context.commit("clearOrganizations");
    },
  },
  modules: {},
};
