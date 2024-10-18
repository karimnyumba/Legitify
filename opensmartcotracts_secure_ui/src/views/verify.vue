<!-- @format -->

<template>
  <navBar />
  <v-container>
    <div class="mb-5">
      <v-icon color="blue">mdi-hand-wave</v-icon>
    </div>
    <div class="mt-2 div-card">
      <form class="container" @submit="verify">
        <div class="row my-5 py-5">
          <div class="col-md-6">
            <label class="form-label" for="form4Example1"
              >Attach document</label
            >
            <div class="form-outline mb-4 input-border">
              <input
                type="file"
                id="form4Example1"
                class="form-control px-5 py-5 file"
                @change="onChanges"
              />
            </div>

            <!-- <label class="form-label" for="form4Example2"
							>Type of document</label
						>
						<div class="form-outline mb-4">
							<input
								type="address"
								id="form4Example1"
								class="form-control input-border"
							/>
						</div> -->

            <!-- <label class="form-label" for="form4Example3">Comment</label>
						<div class="form-outline mb-4">
							<textarea
								class="form-control input-card"
								id="form4Example3"
								rows="4"
							></textarea>
						</div> -->
          </div>
          <div class="col-md-6">
            <div class="uniti-center mt-4 pt-4">
              <v-dialog
                v-model="dialog"
                transition="dialog-top-transition"
                class="dialogue-width"
              >
                <template v-slot:activator="{ on, attrs }">
                  <button
                    color=""
                    v-bind="attrs"
                    v-on="on"
                    class="bg-secondary"
                  >
                    <v-icon color="white"> mdi-check-decagram</v-icon>
                    <span class="text-white px-4 py-4">VERIFY</span>
                  </button>
                </template>
                <template v-model="dialog" v-slot:default="dialog">
                  <v-card width="400px" height="300px">
                    <div class="pt-2 mt-2">
                      <v-img
                        src="../assets/verified.png"
                        class="px-3 mx-3"
                      ></v-img
                      ><br />
                      <div class="uniti-center">
                        <span class="folder-text">Verified</span>
                      </div>
                    </div>

                    <v-container> </v-container>
                  </v-card>
                </template>
              </v-dialog>
              <!-- dialogue2 -->

              <v-dialog
                v-model="dialog2"
                transition="dialog-top-transition"
                class="dialogue-width"
              >
                <template v-slot:activator="{ on, attrs }">
                  <!-- <button
									 
										color=""
										v-bind="attrs"
										v-on="on"
										class="btn bg-secondary"
									>
										<v-icon color="white"> mdi-check-decagram</v-icon>
										<span class="text-white px-4 py-4">VERIFY</span>
									</button> -->
                </template>
                <template v-model="dialog2" v-slot:default="dialog2">
                  <v-card width="400px" height="350px">
                    <div class="pt-2 mt-2">
                      <v-img
                        src="../assets/unverified.png"
                        class="pt-2 mt-5 px-3 mx-3"
                      ></v-img
                      ><br />
                      <!-- <div class="uniti-center">
											<span class="folder-text">Verified</span>
											</div> -->
                    </div>
                    <v-container> </v-container>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </div>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script>
import navBar from "../components/shared/Sidebar.vue";
import emitter from "tiny-emitter/instance";
import { create } from "ipfs-client";
import { ethers, Signer } from "ethers";
import { abi, contractAddress } from "../../LegitifyConstants";
const client = create({
  http: "/ip4/127.0.0.1/tcp/5001",
});

export default {
  name: "dashPage",
  components: {
    navBar,
  },

  data() {
    return {
      dialog: false,
      dialog2: false,
      open: true,
      group: null,
      file: "",
      result: false,
    };
  },
  methods: {
    async onChanges(e) {
      this.file = e.target.files[0];

      // const cid = await client.add(file);
      // console.log(`hey hey ${cid.path}`);
      return file;
    },
    async verify(e) {
      e.preventDefault();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(this.file);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const cid = await client.add(this.file);

      const result = await contract.verifyDocument(cid.path);
      console.log(result);
      this.dialog = result;
      this.dialog2 = !result;
    },
  },
  // async mounted() {
  // 	this.dialog = await this.verify();
  //
  // },
};
</script>

<style scoped>
.coll {
  background-color: rgba(27, 173, 222, 0.45);
}

.navbar2 {
  position: absolute;
  top: 85px;
  left: 2%;
}

.word {
  left: 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 66px;
  /* identical to box height, or 138% */

  color: #095073;
}
.fol-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
}
.text {
  font-family: "Lato";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 29px;
}
.input {
  width: 10%;
  border-radius: 4px solid grey;
}
.table-text {
  height: 18px;
  width: 100%;
  font-family: "Lato";
  font-style: normal;
  /* font-weight: 500;
font-size: 14px;
line-height: 18px; */
  /* identical to box height, or 129% */

  /* Gray/500 */

  color: #667085;
}

.cardpos {
  display: flexbox;
  top: 30%;
  bottom: 60%;
  justify-self: center;
  background: #ffffff;
  border-radius: 20px;
}
.progress {
  background: #051f61;
}
.uniti-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-text-color {
  color: #051f61;
}
.folder-text {
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;

  /* Main color 2 */

  color: #051f61;
}
.col-card {
  border: 2px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
}

.img-fol {
  background: linear-gradient(
      314.09deg,
      rgba(255, 255, 255, 0.2) -16.73%,
      rgba(255, 255, 255, 0) 62.3%
    ),
    #1badde;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(44, 43, 42, 0.1),
    inset 0px -14px 21px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
}
.add-color {
  background: #ebf2ff;
}

.div-card {
  background: #ffffff;
  box-shadow: 0px 4px 0px 7px #cff2fe;
}
.input-card {
  border: 1px solid #22b0df;
}
.input-border {
  border: 1px solid #22b0df;
  width: 566px;
  height: 68px;
}
</style>
