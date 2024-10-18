import { ethers } from "ethers";
import {
  abi,
  contractAddress,
  ipfsClient,
} from "../../../../LegitifyConstants";
import { notifyError, notifySuccess } from "@/services/notificationService";
import { getFormatedTimeStampStartWithDate } from "@/interfaces/global.interface";

export const DocumentSharesStore = {
  state: {
    allDocumentShares: [],
  },
  getters: {
    getAllDocumentShares(state) {
      return state.allDocumentShares.reverse();
    },
  },
  mutations: {
    addDocumentShare(state, documentShare) {
      state.allDocumentShares.push({ ...documentShare });
    },
    setAllDocumentShares(state, documents) {
      state.allDocumentShares = documents;
    },
    clearDocumentShares(state) {
      state.allDocumentShares = [];
    },
  },
  actions: {
    async fetchAllDocumentShares(context, documentIdentification) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let allDocumentShares = await contract.getShares(documentIdentification);

      allDocumentShares = allDocumentShares.map((documentShare) => {
        return {
          comment: documentShare.comment,
          receiver: documentShare.receiver,
          sender: documentShare.sender,
          time: documentShare.time,
        };
      });
      context.commit("setAllDocumentShares", allDocumentShares);
    },
    async addDocumentShare(context, documentShareData) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const time = getFormatedTimeStampStartWithDate();

      const storedResponse = await contract.sendDocument(
        documentShareData.receiver,
        time,
        documentShareData.comment,
        documentShareData.identification
      );

      if (storedResponse.hash) {
        let sender = await signer.getAddress();
        context.commit("addDocumentShare", {
          comment: documentShareData.comment,
          receiver: documentShareData.receiver,
          sender: sender,
          time,
        });
        await notifySuccess("Shared Document successfully!");
      } else {
        await notifyError("Failed to share document!");
      }
    },
    // clearDocuments(context) {
    //     context.commit('clearDocuments')
    // }
  },
  modules: {},
};
