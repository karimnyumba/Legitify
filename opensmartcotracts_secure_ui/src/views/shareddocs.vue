<!-- @format -->

<template>
  <navBar />
  <section class="px-2 mx-2">
    <div class="d-flex justify-content-end p-1">
      <v-btn class="coll text-white" @click="receiveDocs"> re-load </v-btn>
    </div>
    <v-row>
      <div v-if="empty" class="d-flex justify-content-center">
        No document Sent
      </div>
      <v-hover>
        <v-col
          v-for="doc in receivedDocs"
          :key="doc.time"
          cols="4"
          sm="2"
          md="2"
        >
          <!-- <a :href="'http://localhost:8080/ipfs/'+ doc.cidValue" style="text-decoration:none"> -->
          <v-card
            @click="documentDetails(doc.cidValue)"
            @mouseenter="eleC"
            class="`col-card elevation-${ele}`"
          >
            <v-img src="../assets/doc.png" class="pt-2 mt-5 px-3 mx-3"></v-img
            ><br />
            <!-- <div class="ps-3 ms-3">
							<span class="fol-text">path: {{doc.docValue}}</span>
						</div> -->
            <!-- <div class="ps-3 ms-3">
							<h6 class="fol-text"><span>uploaded (day)</span>{{new Date(parseInt(doc.time)).toLocaleDateString()}}</h6>
						</div> -->
            <div class="ps-3 ms-3">
              <h6 class="fol-text">
                <span class="folder-texti">{{ doc[3] }}</span
                ><br />
                <span class="folder-textn"
                  ><span class="pe-2">Sent:</span>
                  {{ new Date(parseInt(doc[4])).toLocaleTimeString() }}</span
                >
              </h6>
            </div>
          </v-card>
        </v-col>
      </v-hover>
    </v-row>
  </section>
</template>
<script>
import emitter from "tiny-emitter/instance";
import { create } from "ipfs-client";
import { ethers, Signer } from "ethers";
import { abi, contractAddress } from "../../LegitifyConstants";
import navBar from "../components/shared/Sidebar.vue";
const client = create({
  http: "/ip4/127.0.0.1/tcp/5001",
});
export default {
  data() {
    return {
      receivedDocs: [],
      ele: 6,
      file: "",
      empty: true,
    };
  },
  name: "sharesPage",
  components: {
    navBar,
  },
  methods: {
    async documentDetails(cidValue) {
      this.$router.push("/documentDetails/" + cidValue);
    },
    async onChanges(e) {
      this.file = e.target.files[0];

      // const cid = await client.add(file);
      // console.log(`hey hey ${cid.path}`);
      return file;
    },
    eleC() {
      if ((this.ele = 6)) {
        this.ele = 22;
      } else {
        this.ele = 6;
      }
    },
    async receiveDocs() {
      let shared = [];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const receivedDocs = await contract.receivedDocs();
      receivedDocs.forEach((doc) => {
        if (doc[0] != "") {
          this.empty = false;
          shared.push(doc);
        }
      });
      console.log(shared);
      return shared;
    },
    async verify(e) {
      e.preventDefault();
      const cid = await client.add(this.file);
    },
  },

  async created() {
    this.receivedDocs = await this.receiveDocs();
  },
};
</script>
<style scoped>
.folder-texti {
  font-family: "Times New Roman", Times, serif;
  font-size: smaller;
  color: #4767b8;
}

.folder-textn {
  font-family: "Times New Roman", Times, serif;
  font-size: small;
  color: #051f61;
}

.unit-center {
  display: flex;
  justify-content: center;
}
</style>
