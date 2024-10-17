<!-- @format -->

<template>
<navBar/>
	<section class="mx-5 px-5">
		<div class="py-5 my-5">
			Welcome,<span class="card-text-color">{{ mem.name }}</span> from
			<span class="card-text-color"> {{ mem.organisation }} </span
			><v-icon color="blue" class="ps-2 ms-2">mdi-hand-wave</v-icon>
		</div>

		<div class="pt-4">
			<nav style="display: flex; justify-content: space-between" class="pb-5">
				<h3 class="folder-text">Documents</h3>

				<div>
					<v-dialog
						v-model="dialog"
						transition="dialog-top-transition"
						class="dialogue-width"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								@click="dialog = true"
								color=""
								v-bind="attrs"
								v-on="on"
								class=""
							>
								<v-icon>mdi-plus</v-icon>
								<span>Store file</span></v-btn
							>
						</template>
						<template v-model="dialog" v-slot:default="dialog">
							<v-card>
								<div class="unit-center">
									<p class="word">Store files</p>
									<hr />
								</div>
								<v-container>
									<form @submit="storeFile" class="my-5 py-5">
										<label class="form-label" for="form4Example1"
											>Attach document</label
										>
										<div class="form-outline mb-4 input-border">
											<input
												@change="onChanges"
												type="file"
												id="form4Example1"
												class="form-control px-5 py-5 file"
											/>
										</div>

										<label class="form-label" for="form4Example3"
											>Add comment</label
										>
										<div class="form-outline mb-4">
											<input
												class="form-control input-card"
												id="form4Example3"
												rows="4"
												v-model="comment"
											/>
										</div>
										<!-- <label class="form-label" for="form4Example3"
											>Document Name</label
										>
										<div class="form-outline mb-4">
											<input
												class="form-control input-card"
												id="form4Example3"
												rows="4"
												v-model="docName"
											/>
										</div> -->

										<div class="unit-center">
											<button
												type="submit"
												class="btn btn-primary btn-block mb-4"
												style="background-color: #04c35c"
											>
												<span class="mx-5 px-5 text-white">ADD</span>
											</button>
										</div>
									</form>
								</v-container>
							</v-card>
						</template>
					</v-dialog>
				</div>
			</nav>
		</div>

		<v-row>
			<v-hover>
				<v-col v-for="doc in documents" :key="doc.time" cols="2" sm="2" md="2">
					 
					<v-card @click="openDoc(doc.cidValue)"  class="col-card" url="http://localhost:8080/ipfs/QmYBySzGhc8hJYvRSfFC9fd9q6TVwMEhAtx1DmYiWq44SP" >
						<v-img src="../assets/doc.png" class="pt-2 mt-5 px-3 mx-3"></v-img
						><br />
						<!-- <div class="ps-3 ms-3">
							<span class="fol-text">path: {{doc.docValue}}</span>
						</div> -->
						<!-- <div class="ps-3 ms-3">
							<h6 class="fol-text"><span>uploaded (day)</span>{{new Date(parseInt(doc.time)).toLocaleDateString()}}</h6>
						</div> -->
						<div class="ps-3 ms-3">
							<h6 class="folder-texti">
								<span class="folder-texti">{{doc.docName}}</span><br>
								<span class="pe-1">Stored:</span>{{ new Date(parseInt(doc.time)).toLocaleTimeString() }} 
							</h6>
						</div>
					</v-card>
				 
				</v-col>
			</v-hover>
			<!-- <v-col cols="6" sm="6" md="3">
				<v-card class="col-card">
					<v-img src="../assets/rec2.svg" class="pt-2 mt-5 px-3 mx-3"></v-img
					><br />
					<div class="ps-3 ms-3">
						<h3 class="fol-text">Work</h3>
					</div>
				</v-card>
			</v-col> -->
			<!-- <v-col cols="6" sm="6" md="3">
				<v-card class="col-card">
					<v-img src="../assets/rec2.svg" class="pt-2 mt-5 px-3 mx-3"></v-img
					><br />
					<div class="ps-3 ms-3">
						<h3 class="fol-text">Certificate</h3>
					</div>
				</v-card>
			</v-col>
			<v-col cols="6" sm="6" md="3">
				<v-card class="col-card">
					<v-img src="../assets/rec2.svg" class="pt-2 mt-5 px-3 mx-3"></v-img
					><br />
					<div class="ps-3 ms-3">
						<h3 class="fol-text">Contracts</h3>
					</div>
				</v-card>
			</v-col> -->
		</v-row>

		<nav
			style="display: flex; justify-content: space-between"
			class="pt-5 mt-4"
		>
			<h3 class="folder-text">Recent files</h3>
		</nav>
	  <v-card>
		<v-table>
			<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Size</th>
					<th class="text-left">Time</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="doc in documents" :key="doc.time">
					<td>{{ share.sender }}</td>
					<td>{{ share.receiver}}</td>
                    <td><span>{{new Date(parseInt(share.time)).toLocaleTimeString() }}</span><span class="ps-2 ">{{new Date(parseInt(share.time)).toLocaleDateString() }}</span></td>
                    <td><v-btn color="secondary" @click="openDoc()">View</v-btn></td>
				</tr>
			</tbody>
		</v-table>
        </v-card>
	</section>
</template>

<script>
import navBar from "../components/shared/Sidebar.vue"
import { create } from "ipfs-client";
	import { ethers } from "ethers";
	import { abi, contractAddress } from "../../secDocConstants";

	const client = create({
		http: "/ip4/127.0.0.1/tcp/5001",
	});

	export default {
		name: "dashPage",
		components:{
			navBar
		},
		props: {},
		data() {
			return {
				dialog: false,
				mem: [],
				documents: [],
				open: true,
				group: null,
				file: "",
				comment: "",
				fileName: "",
				time: "",
				docName:"",
				receiveDocs:[],

			};
		},
		methods: {

			openDoc(cid){
				let baseUrlr  = "http://localhost:8080/ipfs/"
				window.open(baseUrlr + cid)


			},
			
			async userLogin() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const user = await contract.operatorFinder(signer.getAddress());
				console.log(user)
				return user;
			},
			async onChanges(e) {
				this.file = e.target.files[0];
               console.log(this.file)
				// const cid = await client.add(file);
				// console.log(`hey hey ${cid.path}`);
				return file;
			},

			async storeFile(e) {
				e.preventDefault();
				const docName= this.file.name;
				console.log(docName)
				const comment = this.comment;
				const cid = await client.add(this.file);
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const time = Date.now().toString();
				// const signerId = signer.getAddress();
				const storedResponse = await contract.store(cid.path, time,comment,docName);
				console.log(cid.path);
				this.dialog = false;
			},

			async retrieveFiles() {
				let doc = [];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const document = await contract.getDocuments(signer.getAddress());
				document.forEach((el) => {
					if (el.time != "") {
						doc.push(el);
					}
				});
				return doc;
			},
			async shareDocuments() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const result = await contract.sendDocument();
				console.log(result);
			},
			
			clicked(name, org) {
				//   this.$router.push('share/'+name)

				console.log(name);
			},
		},
		async created() {
			this.mem = await this.userLogin();
			this.documents = await this.retrieveFiles();
			this.fileName = this.onChanges();
			this.receivedDocs = await this.receiveDocs();
		},
	};
</script>

<style>
	.unit-center {
		display: flex;
		justify-content: center;
	}
	.coll {
		background-color: rgba(27, 173, 222, 0);
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
	.dialogue-width {
		width: 100%;
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
	}
	.input {
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
	.unit-center {
		display: flex;
		justify-content: center;
	}
	.card-text-color {
		color: #051f61;
	}
	.folder-text {
		font-family: "Lato";
		 font-size:x-small;

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
.folder-texti{ 
    font-family: 'Times New Roman', Times, serif;
    font-size: small;
    color: #4767b8;
}
	.img-fol {
		background: linear-gradient(
				314.09deg,
				rgba(255, 255, 255, 0.2) -16.73%,
				rgba(255, 255, 255, 0) 62.3%
			),
			#1badde;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08),
			0px 2px 4px rgba(44, 43, 42, 0.1),
			inset 0px -14px 21px rgba(0, 0, 0, 0.08);
		border-radius: 7px;
	}
	.add-color {
		background: #ebf2ff;
	}

	.list-item {
		width: 211px;
		height: 42px;

		background: #d9d9d9;
		border-radius: 10px;
	}
</style>
