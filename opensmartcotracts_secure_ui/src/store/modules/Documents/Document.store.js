import { ethers } from "ethers";
import {
  abi,
  contractAddress,
  ipfsClient,
} from "../../../../LegitifyConstants";
import { notifyError, notifySuccess } from "@/services/notificationService";
import { getFormatedTimeStampStartWithDate } from "@/interfaces/global.interface";
import * as dayjs from "dayjs";

export const DocumentStore = {
  state: {
    allDocuments: [],
    currentDocument: undefined,
  },
  getters: {
    getAllDocuments(state) {
      return state.allDocuments;
    },
    getDocumentByCid: (state) => (documentCid) => {
      return state.allDocuments.find(
        (document) => document.documentCid == documentCid
      );
    },
  },
  mutations: {
    addDocument(state, document) {
      state.allDocuments.push({ ...document });
    },
    verifyingDocument(state, cid) {},
    updateDocument(state, document) {},
    setAllDocuments(state, documents) {
      state.allDocuments = documents;
    },
    setCurrentDocument(state, document) {
      state.document = document;
    },
    clearDocuments(state) {
      state.allDocuments = [];
    },
  },
  actions: {
    async fetchAllDocuments(context) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        let allDocuments = await contract.getDocuments(signer.getAddress());

        allDocuments = allDocuments.map((document) => {
          return {
            documentName: document.docName,
            documentDescription: document.description,
            time: dayjs(document.time).format("dddd, MMMM D YYYY"),
            documentCid: document.cidValue,
            documentId: document.identification,
            documentOwner: document.ownerName,
            sender: document.sender,
            hasDocument: document.hasDocument,
            status: document.hasDocument ? "Yes" : "No",
          };
        });
        console.log(allDocuments);
        context.commit("setAllDocuments", allDocuments);
      } catch (error) {}
    },
    async addDocument(context, documentData) {
      const identification = documentData.identification;
      const ownerName = documentData.ownerName;
      const cid = "XXXX-XXXX-XXXX";
      const documentName = `${documentData.ownerName}-${documentData.description}`;
      const documentDescription = documentData.description;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const time = getFormatedTimeStampStartWithDate();

        const storedResponse = await contract.storeDocument(
          cid,
          time,
          documentDescription,
          documentName,
          ownerName,
          identification
        );

        if (storedResponse.hash) {
          context.commit("addDocument", {
            documentName,
            documentDescription,
            time,
            documentCid: cid,
            ownerName,
            identification,
          });
          await notifySuccess("Added document successfully!");
        } else {
          await notifyError("Failed to add document!");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateDocument(context, documentData) {
      const identification = documentData.identification;

      try {
        const cid = await ipfsClient.add(documentData.file);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const storedResponse = await contract.updateDocumentFile(
          cid.path,
          identification
        );

        if (storedResponse.hash) {
          context.commit("updateDocument", {
            documentCid: cid.path,
          });
          await notifySuccess("Updated document successfully!");
        } else {
          await notifyError("Failed to updating document!");
        }
      } catch (error) {}
    },
    async retrieveSingleDocument(context, documentData) {
      const identification = documentData.identification;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let document = await contract.returnDocument(identification);
      context.commit("setCurrentDocument", document);

      return document;
    },

    async verifyingDocument(context, documentData) {
      console.log("documentData");
      console.log(documentData);
      try {
        const cid = await ipfsClient.add(documentData.file);
        console.log("cid.path");
        console.log(cid.path);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        console.log(cid.path);
        const status = await contract.verifyDocument(cid.path);
        context.commit("verfying.....", document);
        console.log(status);
        return status;
      } catch (error) {
        console.log(error);
      }
    },

    clearDocuments(context) {
      context.commit("clearDocuments");
    },
  },
  modules: {},
};
